# Backend Packages & Notes

## Project Setup

### 1. Initialize Project

```bash
npm init -y
```

Creates a `package.json` file with default settings.

---

## Core Backend Packages

### 2. Express

```bash
npm i express
```

Used to create the server, routes, and APIs.

Example:

```js
app.get('/', (req, res) => {
    res.send('Hello World');
});
```

---

### 3. Mongoose

```bash
npm i mongoose
```

ODM (Object Data Modeling) library for MongoDB.

Used to:

* Connect MongoDB
* Create Schemas
* Create Models
* Perform CRUD Operations

---

### 4. Dotenv

```bash
npm i dotenv
```

Loads environment variables from `.env`.

Example:

```js
import 'dotenv/config';
```

---

## Authentication Packages

### 5. JSON Web Token (JWT)

```bash
npm i jsonwebtoken
```

Used to generate and verify authentication tokens.

Common Use Cases:

* Login
* Protected Routes
* User Authentication

Example:

```js
const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET
);
```

---

### 6. Cookie Parser

```bash
npm i cookie-parser
```

Used to read cookies sent by the browser.

Required in:

```js
app.use(cookieParser());
```

Useful when storing JWT tokens inside cookies.

---

### 7. BcryptJS

```bash
npm i bcryptjs
```

Used to hash passwords before storing them in the database.

Why?

* Plain passwords should never be stored.
* Hashes are one-way encrypted values.

Hash Password:

```js
const hash = await bcrypt.hash(password, 10);
```

Compare Password:

```js
const isMatch = await bcrypt.compare(
    password,
    user.password
);
```

Note:

```text
10 = Salt Rounds
```

Higher rounds = More Security + More Processing Time

---

## File Upload Packages

### 8. Multer

```bash
npm i multer
```

Middleware used to handle `multipart/form-data`.

Used when uploading:

* Images
* Videos
* PDFs
* Audio Files

Why Multer?

Express can read:

```js
express.json()
```

and

```js
express.urlencoded()
```

but cannot properly read uploaded files.

Without Multer:

```js
req.file
req.files
```

will not exist.

---

### 9. ImageKit

```bash
npm i @imagekit/nodejs
```

Used to upload and manage files on ImageKit Cloud.

Benefits:

* Cloud Storage
* CDN Delivery
* Optimized Images

---

# Additional Useful Packages

### 10. CORS

```bash
npm i cors
```

Allows frontend and backend running on different origins to communicate.

Example:

```js
app.use(cors());
```

---

### 11. Node-ID3

```bash
npm i node-id3
```

Used to read metadata from MP3 files.

Example Data:

* Song Name
* Album
* Artist
* Duration

---

### 12. Redis Client

```bash
npm i ioredis
```

Used to connect Node.js applications with Redis.

Common Uses:

* Caching
* Session Storage
* Rate Limiting
* Queues

Reference:

```text
25MOODIFY Project
```

---

### 13. Express Validator

```bash
npm i express-validator
```

Used to validate request data before reaching controllers.

Purpose:

Avoid running heavy controller logic on invalid data.

Example:

```js
body('email').isEmail()
```

Controller:

```js
const errors = validationResult(req);
```

Reference:

```text
30ExpressValidator Folder
```

---

### 14. Socket.IO

```bash
npm i socket.io
```

Used for real-time, two-way communication between client and server.

Examples:

* Chat Apps
* Live Notifications
* Multiplayer Games
* Real-Time Tracking

Flow:

```text
Client ↔ Server
```

without page refresh.

---

### 15. Nodemailer

```bash
npm i nodemailer
```

Used to send emails from Node.js.

Common Uses:

* OTP Verification
* Password Reset
* Welcome Emails
* Notifications

Required Environment Variables:

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=
GOOGLE_USER=
```

Reference:

https://github.com/ankurdotio/Difference-Backend-video/tree/main/026-nodemailer

Also follow:

```text
Day-120 | Perplexity
```

---

# GenAI Packages

Reference:

```text
34GenAI Repository
```

### 16. LangChain

```bash
npm i langchain
```

Framework used to build AI applications.

Provides:

* Agents
* Tools
* Messages
* Memory
* Chains

---

### 17. Mistral Integration

```bash
npm i @langchain/mistralai
```

Connects LangChain with Mistral AI models.

---

### 18. Zod

```bash
npm i zod
```

Schema validation library.

Used heavily for:

* Tool Inputs
* Request Validation
* Type Safety

Example:

```js
z.object({
    email: z.string(),
});
```

---

### 19. Readline Sync

```bash
npm i readline-sync
```

Used to take user input from terminal applications.

Example:

```js
const input = readline.question();
```

---

# Important AI Concepts

## LLM (Large Language Model)

The AI model itself.

Examples:

* GPT
* Gemini
* Claude
* Mistral

Think:

```text
LLM = Brain
```

---

## Agent

An Agent is an AI system that can:

* Think
* Make Decisions
* Use Tools
* Perform Actions

Think:

```text
Agent = Manager
```

The Agent decides:

```text
Should I answer directly?
or
Should I use a tool?
```

---

## Tool

A Tool is a normal backend function that the AI can use.

Example:

```js
sendEmail()
```

After converting it into a LangChain Tool:

```js
const emailTool = tool(sendEmail);
```

the AI can call it automatically.

Think:

```text
Tool = AI Superpower
```

Examples:

* Send Email
* Create User
* Search Database
* Generate PDF
* Fetch Weather

---

## Messages

Messages are the conversation history.

Example:

```js
[
  HumanMessage("Hi"),
  AIMessage("Hello")
]
```

Think:

```text
Messages = AI Memory
```

Without messages, AI forgets previous conversation context.

---

# Common Bugs

### Wrong Property Name

❌

```js
agent.invoke({
    message
});
```

✅

```js
agent.invoke({
    messages
});
```

---

### Wrong Data Type

❌

```js
messages: "hello"
```

✅

```js
messages: [
    new HumanMessage("hello")
]
```

---

### Wrong Object Shape

❌

```js
{
    msg: messages
}
```

✅

```js
{
    messages
}
```

---

### Missing Required Fields

If a schema requires:

```js
{
    email: string
}
```

Then sending:

```js
{}
```

will fail validation.
