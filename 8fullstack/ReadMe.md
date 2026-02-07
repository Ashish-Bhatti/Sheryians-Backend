// cors - install to bypass cores policy
- i npm cors
- in app file we require it and use it
    const cors = require('cors)
    app.use(cors())
- no we can access backend data from frontend 