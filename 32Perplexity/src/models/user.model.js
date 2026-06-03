import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

// 'save' is a Mongoose lifecycle event (similar to an event name like 'click' or 'submit').
// This middleware runs automatically BEFORE a user document is saved.
userSchema.pre('save', async function () {
    // 'this' refers to the current user document being saved.
    // If the password field was NOT changed, skip hashing.
    // This prevents hashing an already-hashed password again.
    if (!this.isModified('password')) return;

    // Hash the plain-text password before storing it in MongoDB.
    // 10 = bcrypt salt rounds (cost factor).
    this.password = await bcrypt.hash(this.password, 10);
});

// Add a custom method to every User document.
// Usage:
// const isMatch = await user.comparePassword("123456");
userSchema.methods.comparePassword = function (candidatePassword) {
    // candidatePassword = password entered by the user during login
    // this.password = hashed password stored in the database
    // bcrypt.compare() returns true if they match, otherwise false.
    return bcrypt.compare(candidatePassword, this.password);
};
const userModel = mongoose.model('user', userSchema);

export default userModel;
