- in postman
    we use body - raw - json to request the data from it in post method

KEY POINTS
1. app.use(express.json()) - without it express can't read the json data
2. app.post(...)  - used to send data to server
3. console.log(res.body) - to log the data
4. app.get(...) - to get data from server
