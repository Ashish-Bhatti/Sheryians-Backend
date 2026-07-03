import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contact: {
        type: String,
        required: false,
        unique: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: function () {
            return !this.googleId;
        },
        select: false, // exclude password from query results by default , it means when we fetch user data from database it will not include the password field by default for security reasons
    },
    role: {
        type: String,
        enum: ['buyer', 'seller'],
        default: 'buyer',
    },
    googleId: {
        type: String,
    },
});

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model('user', userSchema);

export default userModel;
