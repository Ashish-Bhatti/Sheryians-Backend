const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    caption : {
        type : String,
        default : ""
    },
    image : {
        type : String,
        required : [true, "Image is required"]
    },
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : [true, "User is required"]
    }
})

const postModel = mongoose.model("Post", postSchema)