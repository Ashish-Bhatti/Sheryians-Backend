===
=> user.model.js
password: {
        select : false, // when we fetch user data from database it will not includethe password field by default for   security reasons
},




=== auth flow ====
=> register
1. Get data from req.body
2. Validate input (required fields, email format, password length, etc.)
3. Check if user already exists
4. Hash password
5. Create new user in DB
6. Create JWT token
7. Save token in cookie
8. Send response

req.body
   ↓
validate input
   ↓
check duplicate user
   ↓
hash password
   ↓
save user
   ↓
generate token
   ↓
set cookie
   ↓
response

=> login
1. Get data from req.body
2. Validate input
3. Find user in DB
4. Compare password (bcrypt.compare)
5. Create JWT token
6. Save token in cookie
7. Send response
req.body
   ↓
validate input
   ↓
find user
   ↓
compare password
   ↓
generate token
   ↓
set cookie
   ↓
response

-- install redis package
npm i ioredis

-- install node-id3 - it is used to read all the data inside a file with buffer
npm i node-id3