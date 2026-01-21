- server respond

    app.get('/path',(request,response)=>{
        response.send('Message')
    })

- once we run server it will not dedicate any new change so we need to stop and run server again and again
    to solve that we use
    "npx nodemon server.js" - it auto stop and run server on changes

- .gitignore
    we use it while deploying our app to ignore some files like - node_modules and .env
    never upload node_modules and .env file on github


- npm is a package manager for installing, managing, and publishing packages,
- npx is a package runner used for executing Node.js packages and their binaries directly without permanently installing them