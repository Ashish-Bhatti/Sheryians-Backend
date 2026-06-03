// packages
1. npm init -y
2. npm i express
3. npm i mongoose
4. npm i dotenv
5. npm i jsonwebtoken - to create a token - require in authRouter
6. npm i cookie-parser - to save token in cookies - require in app
7. npm i bcryptjs - more secure than crypto, and it provides more features - require in authRouter
    const hash = await bcrypt.hash(password , 10) // 10 is salt - it means 10 layer of hashing
    const compareHashesPassword = await bycrypt.compare(password, user.password)
8. npm i multer - it is a middleware - used to read form-data from req. body so we can upload an image from the frontend
    -  require in the controller file
9. npm i @imagekit/nodejs - to upload an image on imagekit cloud

// extra
1. npm i cors
2. npm i node-id3 - it is used to read all the data inside a file
3. npm i ioredis - to use Redis, we use this package. You can know more about it in the 25MOODIFY project
4. npm i express-validator - before sending data to the controller (heavy operation), we validate the data to check if it's even right or not. For more info, go to 30ExpressValidator File
5. npm i socket.io - it is the backend library that enables real-time, two-way communication between clients and the server.
6. npm i nodemailer - primary work is to send email. It will need 4 things GOOGLE_CLIENT_ID , GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN , GOOGLE_USER
For more info visit this link - https://github.com/ankurdotio/Difference-Backend-video/tree/main/026-nodemailer
And follow class Day-120 | Perplexity

// defination
1. One clean way to say it:

Multer is middleware used to handle and read multipart/form-data (file uploads) sent from the frontend, because Express alone cannot properly read file data like images, videos, or songs.

Very similar to:

express.json() → reads JSON data
express.urlencoded() → reads form text data
multer → reads file upload data

Without Multer, req.file or req.files would not exist because Express does not understand multipart file data by default.
