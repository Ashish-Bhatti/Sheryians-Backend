"dependencies": {
    "axios": "^1.16.1",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-router": "^7.14.1",
    "react-router-dom": "^7.14.2",
    "sass": "^1.99.0"
  },

---------------------------packages------------------------
npm i react-router-rom
npm i sass - // so we can use sass without using live sass complier extension
npm i axios - // to run the api
npm i cors - // cors policy so frontend can access api from backend

-----------------------------
axios.post('http://localhost:3000/api/auth/login', {  username, password },
    { withCredentials:true })
    .then((res) => console.log(res.data));

=> { withCredentials:true } --> we use it so we can set cookies in frontend without it browser don't store the cookies







-- folder structure
  src
  --features
    --auth
      --pages    // here  we create login / register page UI
      --services // all the auth related api call request comes here
      --style