// we are going to use IMPORT/ EXPORT module in this project

1. we need to updata package.json file
we will add this to package.json file, so we can use import/export


"type": "module",


==> Express Error Handling
1. Express has a default error handler. If an error reaches it, the server usually does not crash, and Express sends an error response (often HTML in development).

2. We create our own error.middleware.js so we can:
  - send errors in JSON format
  - customize status codes
  - hide sensitive information
  - keep error responses consistent

3. An error-handling middleware must have 4 parameters:
   - (err, req, res, next)
   - The first parameter (err) tells Express that this is an error middleware.

4. We register the error middleware after all routes and other middleware:
  - app.use(handleError);
  - Usually at the bottom of app.js:
  ```app.use('/users', userRoutes);
    app.use('/songs', songRoutes);
    app.use(handleError);```

5. To send an error to this middleware, we use:
  - next(error);
  - or throw an error inside async code (with proper async error handling).


----------- ----------- ------------------
=> npm i express-validator
1. Then import what you need:

2. import { body, query, param, validationResult } from 'express-validator';

Commonly used:

- body() → validate req.body
- query() → validate req.query
- param() → validate req.params
- validationResult() → get validation errors

Example:
``` router.post(
    '/register',
    [
        body('email').isEmail(),
        body('password').isLength({ min: 6 })
    ],
    register
); ```

This ensures invalid data is caught before your main controller logic runs.