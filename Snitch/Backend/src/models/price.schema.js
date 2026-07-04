import mongoose from 'mongoose';

const priceSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    currency : {
        type: String,
        enum: ['USD', 'EUR', 'GBP', 'INR'],
        default: 'INR',
    }
},{
    _id : false,
    versionKey : false
})

// _id: false means that the priceSchema will not have its own unique identifier (_id) field. This is useful when you want to embed this schema as a subdocument in another schema (like productSchema) and don't need a separate identifier for it.
// versionKey: false means that Mongoose will not add the __v field to documents created from this schema. The __v field is used by Mongoose for internal versioning of documents, but in this case, it's not needed.

export default priceSchema;