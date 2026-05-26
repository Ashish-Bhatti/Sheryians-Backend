1. pre() → A Mongoose middleware hook that runs before a database action (like save, delete, update) to perform logic automatically.
2. post() → A Mongoose middleware hook that runs after a database action is completed to perform follow-up logic automatically.

=> why not use Redis as a primary database
1. costly - because they use RAM
2. unable to perform query - they store data in key-value pair and values are in String format

Redis -> store data in key-value format
MONGODB -> store data in BSON format

Why do we need Redis?
1. In-memory storage (RAM) → very fast read/write compared to disk-based databases like MongoDB.
2. Caching → store frequently used data temporarily so app doesn’t hit MongoDB every time.
3. Session/token storage → commonly used for auth sessions, OTPs, JWT blacklisting.
4. Rate limiting → track requests quickly (e.g. login attempts, API limits).
5. Pub/Sub & queues → real-time messaging, background jobs.
6. Temporary data with expiry (TTL) → OTP, cache, reset tokens, etc.

=> One-line interview definition :-
Redis is an in-memory data store used for caching, sessions, rate limiting, queues, and fast temporary data access to reduce load on the main database.


-- install redis package
npm i ioredis