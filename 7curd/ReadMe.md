// .env file

1. npm i dotenv
2. require it in server.js file - require('dotenv').config()
3. store MONGO_URI = uri_string

// mongoose
// MONGO_URI = mongodb+srv://ashishbhattidev_db_user:CPUX7KRgfjM4EXlz@cluster0.dkmbyz9.mongodb.net/7curd

- after last slash whatever we write become a database and if there is no database with that name it will auto create it

1. npm i mongoose
2. require it in server.js file - const mongoose = require('mongoose');
3. create a folder in src - src > config > database.js in it we create a function to connected to database, require mongoose in database.js file
4. now instead of using URI_STRING directly we use it like - process.env.MONGO_URI from the .env

```
    function connectToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('connected to database')
    })
}
```

5. require that function in server.js and call it also we need to require mongoose in database.js file

// schema and models

- schema - it tell the database what to store like in what format
- models - it send the actual data to the database

- create new folder in src > models > notes.model.js

1. require mongoose
2. create Schema

```const noteSchema = new mongoose.Schema({
    title: String,
    description: String,
});
```

3. create model

```const noteModel = mongoose.model('notes', noteSchema);

```

4. export the mode
   module.exports = noteModel;

// now in app.js

1. require model
   const noteModel = require('./models/notes.model');

2. create a noteModel to send data to database
    ```const note = await noteModel.create({
    title,
    description,
    });
    ```
3. use async await since we don't know how much time it will take to reach data to database



-----------------------------------------------//--------------------------------------------------------------


1. The .env File & Database Naming
   Your definition: "after last slash whatever we write become a database and if there is no database with that name it will auto create it"

My take: Spot on. This is one of the best features of MongoDB—it’s "lazy." It won't actually create the physical database until you insert your first piece of data, but the URI logic you described is exactly how it's targeted.

2. Schema
   Your definition: "it tell the database what to store like in what format"

My take: Accurate. Think of the Schema as the "Blueprint" or the "Rules." While MongoDB is naturally "schemaless," Mongoose uses the Schema to enforce structure on the application side so your data doesn't get messy.

3. Models
   Your definition: "it send the actual data to the database"

My take: Mostly right. To be more precise, the Model is the "Wrapper" or the "Interface." \* The Schema is the map.

The Model is the car that actually drives the data to the destination.

It provides the methods like .find(), .create(), and .update().

4. Async/Await
   Your definition: "use async await since we don't know how much time it will take to reach data to database"

My take: Perfect. Database operations are "I/O bound" (input/output), meaning they happen outside of your CPU's immediate control. If you didn't use await, your code would keep running and try to use a "note" that doesn't exist yet, resulting in an error or undefined.
