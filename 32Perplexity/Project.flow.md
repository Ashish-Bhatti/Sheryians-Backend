# Project Flow

## 1. Setup & Startup

- Install dependencies with `npm install`.
- Configure database connection in `src/config/database.js`.
- Start the server from `server.js` or `src/app.js`.
- Server initializes routes, middleware, and database connection.

## 2. Incoming Request Handling

- Client sends an HTTP request to an API route.
- The request is routed through `src/routes/*`.
- If a route requires authentication, `src/middleware/auth.middleware.js` validates the token.
- Input is validated in `src/validators/*` before controller logic runs.

## 3. Authentication Flow

- `src/routes/auth.routes.js` defines authentication endpoints such as register and login.
- `src/controllers/auth.controller.js` handles the request logic.
- The controller interacts with `src/models/user.model.js` to create or verify users.
- Passwords are compared securely, and tokens are generated for successful login.
- Authenticated routes return a JWT or session token to the client.

## 4. Data Models

- `src/models/user.model.js` stores user credentials, profile, and authentication data.
- `src/models/chat.model.js` stores chat sessions or conversation metadata.
- `src/models/message.model.js` stores individual messages within a chat.

## 5. Message / Chat Flow

- The client sends a message or chat request to the appropriate API endpoint.
- Route handlers forward the request to controller logic.
- Controllers use models to save messages and retrieve chat history.
- The response is returned with chat data or confirmation of update.

## 6. Nodemailer / Email Flow

- Nodemailer is configured in the backend using SMTP or a mail service.
- When email functionality is triggered, the app creates a transporter and mail options.
- The app sends email via `transporter.sendMail(...)`.
- Success or failure is handled and returned to the request flow.

## 7. Error Handling

- Validation errors are caught and returned with clear messages.
- Authentication failures return unauthorized responses.
- Server or database errors are logged and returned as an error response.

## 8. Response to Client

- After processing, the backend sends a JSON response.
- Responses include status codes such as `200`, `201`, `400`, or `401`.
- Successful operations return data like user info, chat messages, or authentication tokens.
