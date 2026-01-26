Delete method api

- params is used to get dynamic value
  app.delete('/notes/:index',(req,res)=>{
    delete notes[req.params.index] // it delete the notes from notes array
    console.log(req.params.index)
})

here /:index is a dynamic value and we use req.params.index to get that value

req.params - is to get single values like - index, keys
    without ':' (colan) params don't work
req.body - is to get larger data


Things to remember for the basics:
1. req.params: Used for things in the URL (like :index).
2. req.body: Used for the data being "shipped" to the server (the JSON).
3. res.send or res.json: You must have one of these at the end of every route, or the browser/Postman will just hang forever waiting for an answer!


------------------------------------------------------
# Notes API (Basics)

A simple Express.js CRUD API for managing a list of notes.

## Installation
1. Initialize the project: `npm init -y`
2. Install Express: `npm install express`
3. Run the app: `node index.js`

## API Reference

| Method | Route | Description |
| :--- | :--- | :--- |
| **GET** | `/` | Home route |
| **GET** | `/notes` | Get all notes |
| **POST** | `/notes` | Create a new note |
| **PATCH** | `/notes/:index` | Update a note's description |
| **PUT** | `/notes/:index` | Replace a whole note |
| **DELETE** | `/notes/:index` | Remove a note |

## Testing in Postman

### POST /notes
**Body (JSON):**
```json
{
  "title": "Learning Express",
  "description": "I am learning the basics of routes"
}


PATCH /notes/0
Body (JSON):

JSON
{
  "description": "Updated description only"
}


PUT /notes/0
Body (JSON):

JSON
{
  "title": "Brand New Title",
  "description": "Brand new description"
}