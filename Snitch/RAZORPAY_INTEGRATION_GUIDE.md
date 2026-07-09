# Razorpay Integration Guide — Snitch (Step by Step)

> This guide walks through the complete Razorpay payment integration used in the **Snitch** e‑commerce application. The integration spans both the **Backend (Express + Mongoose)** and the **Frontend (React + Vite)**.

---

## Table of Contents

1. [Overview & Architecture](#1-overview--architecture)
2. [Prerequisites](#2-prerequisites)
3. [Backend Setup](#3-backend-setup)
   - 3.1 Install the Razorpay package
   - 3.2 Configure environment variables
   - 3.3 Create the payment service
   - 3.4 Create the Payment Mongoose model
   - 3.5 Build the order controller
   - 3.6 Build the verification controller
   - 3.7 Register routes
4. [Frontend Setup](#4-frontend-setup)
   - 4.1 Install react-razorpay
   - 4.2 Create API service functions
   - 4.3 Create the custom hook
   - 4.4 Integrate Razorpay in the Cart page
   - 4.5 Order success page
5. [Complete Request/Response Flow](#5-complete-requestresponse-flow)
6. [Testing](#6-testing)
7. [Common Issues & Troubleshooting](#7-common-issues--troubleshooting)

---

## 1. Overview & Architecture

The Razorpay integration follows a **server-side order creation + client-side payment** pattern:

```
User clicks "Proceed to Checkout"
        │
        ▼
[Frontend] POST /api/cart/payment/create/order  ───►  [Backend] Creates Razorpay Order
        │                                                          │
        │◄────────── { order_id, amount, currency } ──────────────┘
        │
        ▼
[Frontend] Opens Razorpay Checkout Modal (using order_id)
        │
User completes payment in Razorpay popup
        │
        ▼
[Frontend] Receives { razorpay_order_id, razorpay_payment_id, razorpay_signature }
        │
        ▼
[Frontend] POST /api/cart/payment/verify/order  ───►  [Backend] Verifies Signature
                                                                  │
        │◄────────── { success: true/false } ─────────────────────┘
        │
        ▼
[Frontend] Navigate to /order-success or show error
```

**Key files involved:**

| Layer | File | Purpose |
|-------|------|---------|
| Backend | `Backend/src/services/payment.service.js` | Razorpay client init & order creation |
| Backend | `Backend/src/models/payment.model.js` | Mongoose schema for payments |
| Backend | `Backend/src/controllers/cart.controller.js` | `createOrderController` & `verifyOrderController` |
| Backend | `Backend/src/routes/cart.routes.js` | Route registration |
| Backend | `Backend/src/config/config.js` | Environment config validation |
| Frontend | `Frontend/src/features/cart/services/cart.api.js` | Axios API calls |
| Frontend | `Frontend/src/features/cart/hook/useCart.js` | Custom hook wrapping API calls |
| Frontend | `Frontend/src/features/cart/pages/Cart.jsx` | Checkout button & Razorpay integration |
| Frontend | `Frontend/src/features/cart/pages/OrderSuccess.jsx` | Post-payment success page |

---

## 2. Prerequisites

- **Razorpay Test/Dashboard Account** — Sign up at [razorpay.com](https://razorpay.com)
- Obtain your **Key ID** and **Key Secret** from the Razorpay Dashboard → Settings → API Keys
- Node.js (v18+) and npm installed
- MongoDB instance running

---

## 3. Backend Setup

### 3.1 Install the Razorpay package

```bash
cd Backend
npm install razorpay
```

> **Note:** This project already has `"razorpay": "^2.9.6"` in `package.json`.

### 3.2 Configure environment variables

Add the following to your `.env` file (inside the `Backend/` directory):

```env
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_secret_key_here
```

**Validate in config** (`Backend/src/config/config.js`):

```js
if (!process.env.RAZORPAY_KEY_ID) {
    throw new Error('RAZORPAY_KEY_ID is not defined in environment variables');
}
if (!process.env.RAZORPAY_KEY_SECRET) {
    throw new Error('RAZORPAY_KEY_SECRET is not defined in environment variables');
}

export const config = {
    // ... other configs
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
};
```

### 3.3 Create the payment service

**File:** `Backend/src/services/payment.service.js`

```js
import Razorpay from 'razorpay';
import { config } from '../config/config.js';

const razorpay = new Razorpay({
    key_id: config.RAZORPAY_KEY_ID,
    key_secret: config.RAZORPAY_KEY_SECRET,
});

export const createOrder = async ({ amount, currency = 'INR' }) => {
    const options = {
        amount: amount * 100, // Razorpay expects amount in paise
        currency: currency,
    };
    const order = await razorpay.orders.create(options);
    return order;
};
```

**What this does:**
- Creates a Razorpay client instance with your API keys.
- Exposes a `createOrder` function that receives an `amount` (in rupees) and `currency`.
- Multiplies `amount` by **100** because Razorpay works in **paise** (the smallest currency unit).
- Calls `razorpay.orders.create()` and returns the order object.

### 3.4 Create the Payment Mongoose model

**File:** `Backend/src/models/payment.model.js`

```js
import mongoose from 'mongoose';
import priceSchema from './price.schema.js';

const paymentSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
    },
    price: {
        type: priceSchema,
        required: true,
    },
    razorpay: {
        orderId: String,
        paymentId: String,
        signature: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    orderItem: [
        {
            title: String,
            productId: mongoose.Schema.Types.ObjectId,
            variantId: mongoose.Schema.Types.ObjectId,
            quanitiy: Number,
            images: [{ url: String }],
            description: String,
            price: priceSchema,
        },
    ],
});

const paymentModel = mongoose.model('payment', paymentSchema);

export default paymentModel;
```

**Key fields:**
- `status` — tracks the lifecycle: `pending` → `completed` | `failed`
- `razorpay.orderId` — set when the order is created on Razorpay
- `razorpay.paymentId` + `razorpay.signature` — set after successful verification
- `orderItem` — snapshot of what was purchased (in case products change later)

### 3.5 Build the Order Creation Controller

**File:** `Backend/src/controllers/cart.controller.js`

```js
import { validatePaymentVerification } from 'razorpay/dist/utils/razorpay-utils.js';
import { getCartDetails } from '../dao/cart.dao.js';
import paymentModel from '../models/payment.model.js';
import { createOrder } from '../services/payment.service.js';
import { config } from '../config/config.js';

// ─── Create Order ───
export const createOrderController = async (req, res) => {
    const cart = await getCartDetails(req.user._id);

    if (!cart) {
        return res.status(400).json({
            message: 'cart is empty',
            success: false,
        });
    }

    // 1. Create order on Razorpay
    const order = await createOrder({
        amount: cart.totalPrice,
        currency: cart.currency,
    });

    // 2. Save payment record in DB (status: pending)
    const payment = await paymentModel.create({
        user: req.user._id,
        razorpay: {
            orderId: order.id,
        },
        price: {
            amount: cart.totalPrice,
            currency: cart.currency,
        },
        orderItems: cart.items.map((item) => ({
            title: item.product.title,
            productId: item.product._id,
            variantId: item.variant,
            quantity: item.quantity,
            images: item.product.variants.images || item.product.images,
            description: item.product.description,
            price: {
                amount: item.product.variants.price.amount || item.product.price.amount,
                currency: item.product.variants.price.currency || item.product.price.currency,
            },
        })),
    });

    // 3. Send order details to frontend
    return res.status(201).json({
        message: 'order created successfully',
        success: true,
        order,
    });
};
```

### 3.6 Build the Verification Controller

```js
// ─── Verify Payment ───
export const verifyOrderController = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // 1. Find the pending payment in DB
    const payment = await paymentModel.findOne({
        'razorpay.orderId': razorpay_order_id,
        status: 'pending',
    });

    if (!payment) {
        return res.status(400).json({
            message: 'payment not found',
            success: false,
        });
    }

    // 2. Verify signature using Razorpay's utility
    const isPaymentValid = validatePaymentVerification(
        {
            order_id: razorpay_order_id,
            payment_id: razorpay_payment_id,
        },
        razorpay_signature,
        config.RAZORPAY_KEY_SECRET
    );

    if (!isPaymentValid) {
        payment.status = 'failed';
        await payment.save();

        return res.status(400).json({
            message: 'payment verification failed',
            success: false,
        });
    }

    // 3. Mark as completed
    payment.status = 'completed';
    payment.razorpay.paymentId = razorpay_payment_id;
    payment.razorpay.signature = razorpay_signature;
    await payment.save();

    return res.status(200).json({
        message: 'payment verified successfully',
        success: true,
    });
};
```

**Why verification matters:**
- The signature check (`validatePaymentVerification`) ensures the payment wasn't tampered with.
- It uses HMAC-SHA256 to verify that the `order_id` + `payment_id` pair was genuinely issued by Razorpay.
- **Never trust the client alone** — always verify on the server.

### 3.7 Register Routes

**File:** `Backend/src/routes/cart.routes.js`

```js
import { createOrderController, verifyOrderController } from '../controllers/cart.controller.js';

// POST /api/cart/payment/create/order  — Create a Razorpay order
cartRouter.post('/payment/create/order', authenticateUser, createOrderController);

// POST /api/cart/payment/verify/order  — Verify payment after checkout
cartRouter.post('/payment/verify/order', authenticateUser, verifyOrderController);
```

> Both routes require authentication (`authenticateUser` middleware).

---

## 4. Frontend Setup

### 4.1 Install react-razorpay

```bash
cd Frontend
npm install react-razorpay
```

> This project already has `"react-razorpay": "^3.0.1"` in `package.json`.

### 4.2 Create API service functions

**File:** `Frontend/src/features/cart/services/cart.api.js`

```js
import axios from 'axios';

const cartApi = axios.create({
    baseURL: '/api/cart',
    withCredentials: true,
});

// Create Razorpay order (backend)
export const createCartOrder = async () => {
    const response = await cartApi.post('/payment/create/order');
    return response.data;
};

// Verify payment (backend)
export const verifyCartOrder = async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {
    const response = await cartApi.post('/payment/verify/order', {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
    });
    return response.data;
};
```

### 4.3 Create the custom hook

**File:** `Frontend/src/features/cart/hook/useCart.js`

```js
import { createCartOrder, verifyCartOrder } from '../services/cart.api';

export const useCart = () => {
    async function handleCreateCartOrder() {
        const data = await createCartOrder();
        return data.order;    // returns the Razorpay order object
    }

    async function handleVerifyCartOrder({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) {
        const data = await verifyCartOrder({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        });
        return data.success;  // boolean
    }

    return { handleCreateCartOrder, handleVerifyCartOrder };
};
```

### 4.4 Integrate Razorpay in the Cart page

**File:** `Frontend/src/features/cart/pages/Cart.jsx`

```jsx
import { useRazorpay } from 'react-razorpay';
import { useCart } from '../hook/useCart';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const Cart = () => {
    const { handleCreateCartOrder, handleVerifyCartOrder } = useCart();
    const navigate = useNavigate();
    const { error, isLoading, Razorpay } = useRazorpay();
    const user = useSelector((state) => state.user);

    async function handleCheckout() {
        // 1. Create order on backend → gets Razorpay order
        const order = await handleCreateCartOrder();
        console.log(order);

        // 2. Configure Razorpay checkout options
        const options = {
            key: 'rzp_test_TAud7gg7oeLV8H',               // Your Razorpay Key ID
            amount: order.amount,                          // Amount in paise
            currency: order.currency,
            name: 'Snitch',
            description: 'Test Transaction',
            order_id: order.id,                            // Razorpay order ID
            handler: async (response) => {
                // 3. On successful payment → verify on backend
                const isValid = await handleVerifyCartOrder(response);
                if (isValid) {
                    navigate(`/order-success?order_id=${response?.razorpay_order_id}`);
                }
            },
            prefill: {
                name: user?.fullname,
                email: user?.email,
                contact: user?.contact,
            },
            theme: {
                color: '#C9A96E',   // Brand primary color
            },
        };

        // 4. Open Razorpay checkout modal
        const razorpayInstance = new Razorpay(options);
        razorpayInstance.open();
    }

    // ... render "Proceed to Checkout" button that calls handleCheckout
};
```

**Important notes:**
- `Razorpay` constructor is provided by the `useRazorpay()` hook.
- `order.amount` is returned in **paise** from the backend (matching Razorpay's format).
- The `handler` callback fires when the user completes payment inside the modal.
- You should move the Razorpay **Key ID** to an environment variable instead of hardcoding it.

### 4.5 Order success page

**File:** `Frontend/src/features/cart/pages/OrderSuccess.jsx` (optional)

```jsx
import { useSearchParams } from 'react-router-dom';

const OrderSuccess = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('order_id');

    return (
        <div>
            <h1>Order Placed Successfully!</h1>
            <p>Your Razorpay Order ID: {orderId}</p>
            <p>Thank you for your purchase.</p>
        </div>
    );
};
```

---

## 5. Complete Request/Response Flow

Here is the full flow with exact payloads:

### Step 1 — Create Order (Frontend → Backend)

**Request:**
```
POST /api/cart/payment/create/order
Cookie: token=<jwt>
```

**Response (Backend → Frontend):**
```json
{
    "message": "order created successfully",
    "success": true,
    "order": {
        "id": "order_Pz8xAbCdEfGhIjKl",
        "entity": "order",
        "amount": 599900,
        "amount_paid": 0,
        "amount_due": 599900,
        "currency": "INR",
        "receipt": null,
        "status": "created",
        "attempts": 0,
        "notes": [],
        "created_at": 1700000000
    }
}
```

### Step 2 — Open Razorpay Checkout (Frontend only)

The `order.id` from Step 1 is passed to the Razorpay modal. The user completes payment.

### Step 3 — Verify Payment (Frontend → Backend)

**Request:**
```
POST /api/cart/payment/verify/order
Cookie: token=<jwt>
Body:
{
    "razorpay_order_id": "order_Pz8xAbCdEfGhIjKl",
    "razorpay_payment_id": "pay_Pz8yMnOpQrStUvWx",
    "razorpay_signature": "e1f2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0"
}
```

**Response (Backend → Frontend):**
```json
{
    "message": "payment verified successfully",
    "success": true
}
```

---

## 6. Testing

### Use Razorpay Test Mode

1. **Get test API keys:**
   - Log in to [Razorpay Dashboard](https://dashboard.razorpay.com)
   - Go to **Settings → API Keys**
   - Generate a test key (starts with `rzp_test_`)

2. **Test card numbers** (in the Razorpay popup):
   - **Success:** `4111 1111 1111 1111` (any future expiry, any CVV)
   - **Failure:** Use any card number with insufficient funds, or use a specific 3DS flow

3. **Test UPI:**
   - `success@razorpay` — Simulates a successful UPI payment
   - `fail@razorpay` — Simulates a failed UPI payment

### Run the application

```bash
# Terminal 1 — Backend
cd Backend
npm run dev

# Terminal 2 — Frontend
cd Frontend
npm run dev
```

---

## 7. Common Issues & Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| `RAZORPAY_KEY_ID not defined` | Missing environment variables | Add `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` to `.env` |
| `amount must be greater than zero` | Amount is 0 or not multiplied by 100 | Ensure `createPaymentService` multiplies by 100 |
| `Payment verification failed` | Invalid signature or wrong key secret | Double-check `RAZORPAY_KEY_SECRET` matches the dashboard |
| `Only 0 items left in stock` | Cart empty or fetch failed | Check cart API response & `getCartDetails` DAO |
| `Razorpay is not defined` | `react-razorpay` not loaded | Check `package.json` has `react-razorpay` & import is correct |
| `order_id is invalid` | Order ID from backend doesn't match Razorpay | Ensure you're passing `order.id` (not `order._id` or similar) |
| CORS errors | Frontend origin not allowed | Uncomment and configure `cors()` in `app.js` |
| 401 on payment routes | JWT token missing | Ensure `withCredentials: true` in axios config |

---

## Summary

You have now integrated Razorpay end-to-end:

1. **Backend** — Installed `razorpay`, created a payment service, Mongoose model, order creation & verification controllers, and routes.
2. **Frontend** — Installed `react-razorpay`, created API service functions, a custom hook, and integrated the Razorpay checkout modal.
3. **Flow** — Server creates the order → Client opens Razorpay modal → Client sends verification to server → Server validates HMAC signature.

> **Security best practice:** Never expose your `RAZORPAY_KEY_SECRET` on the frontend. The key ID can be public, but the secret must remain server-side only.