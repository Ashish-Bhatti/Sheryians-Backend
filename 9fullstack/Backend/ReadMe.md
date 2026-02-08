// package

1. npm init -y
2. npm i express
3. npm i mongoose
4. npm i dotenv
5. npm i cors
    const cors = require('cors');
    app.use(cors());

// run frontend in backend
1. create public folder and paste 3 files which we get from frontend by
    npm run build
2. in app.js file require path
    const path = require('path')
3. use a middleware
    app.use(express.static('./public'))