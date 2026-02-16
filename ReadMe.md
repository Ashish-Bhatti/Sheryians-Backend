// packages
1. npm init -y
2. npm i express
3. npm i mongoose
4. npm i dotenv
5. npm i jsonwebtoken - to create a token - require in authRouter
6. npm i cookie-parser - to save token in cookies - require in app
7. npm i bcryptjs - more secure than crypto and it provide more feature - require in authRouter
    const hash = await bcrypt.hash(password , 10) // 10 is salt - it means 10 layer of hashing
    const compareHashesPassword = await bycrypt.compare(password, user.password)
8. npm i multer - it is a middleware - used to read from-data from req.body so we can upload image from frontend -  require in controller file

// extra
1. npm i cors