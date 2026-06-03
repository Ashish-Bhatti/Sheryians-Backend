# Package quick reference (simple ReadMe-style format)

Install commands shown as examples; keep them in your project root when needed.

1. `express`

- Install: `npm i express`
- What it does: Minimal, fast web framework for Node.js. Use to create routes and handle HTTP requests.
- Where to require: `const express = require('express')` — used in `app.js` / `server.js`.

2. `mongoose`

- Install: `npm i mongoose`
- What it does: MongoDB ODM — defines schemas, models, and handles DB connections/queries.
- Where to require: In DB config or models (e.g., `src/config/db.js`, `src/models/User.js`).

3. `dotenv`

- Install: `npm i dotenv`
- What it does: Loads `.env` file values into `process.env` for configuration (DB URIs, secrets).
- Where to require: Early in `app.js` or `server.js`: `require('dotenv').config()`.

4. `jsonwebtoken`

- Install: `npm i jsonwebtoken`
- What it does: Create and verify JWT tokens for authentication (sign/verify tokens).
- Where to require: Auth routes/controllers (e.g., `authRouter`).

5. `cookie-parser`

- Install: `npm i cookie-parser`
- What it does: Parses cookies on incoming requests and populates `req.cookies`.
- Where to require: In `app.js` as middleware: `app.use(require('cookie-parser')())`.

6. `bcryptjs`

- Install: `npm i bcryptjs`
- What it does: Pure-JS bcrypt library for hashing passwords and comparing hashes.
- Usage examples:
    - Hash: `const hash = await bcrypt.hash(password, 10)`
    - Compare: `const ok = await bcrypt.compare(password, user.password)`
- Where to require: In auth controllers/routers for signup/login.

7. `multer`

- Install: `npm i multer`
- What it does: Middleware to parse `multipart/form-data` and handle file uploads (images, etc.).
- Where to require: In controllers or route files that accept file uploads.

8. `@imagekit/nodejs`

- Install: `npm i @imagekit/nodejs`
- What it does: ImageKit SDK for uploading, transforming, and delivering images via ImageKit cloud.
- Where to require: In services/controllers handling image upload & storage.

Extras (brief):

- `cors` — `npm i cors` — Enable Cross-Origin Resource Sharing for API access from other origins. Use as `app.use(require('cors')())`.
- `node-id3` — `npm i node-id3` — Read/write ID3 tags in MP3 files (metadata like title/artist).
- `ioredis` — `npm i ioredis` — Redis client for caching, sessions, and pub/sub (see `25Moodify`).
- `express-validator` — `npm i express-validator` — Validate and sanitize incoming request data before controllers.
- `socket.io` — `npm i socket.io` — Real-time bidirectional communication (WebSocket + fallbacks) for chat/notifications.
- `nodemailer` — `npm i nodemailer` — Send emails from Node.js; commonly used with OAuth creds (GOOGLE_CLIENT_ID, etc.).

Short note on `multer` vs others:

- `express.json()` reads JSON body payloads.
- `express.urlencoded()` reads URL-encoded text form data.
- `multer` reads file upload multipart form data and provides `req.file`/`req.files`.
