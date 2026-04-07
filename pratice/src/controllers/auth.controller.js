const userModel = require('../models/user.models');

async function registerController(req, res) {
    const { email, userName, password, bio, profileImage } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ email }, { userName }],
    });

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: 'user already exist',
        });
    }

    const hashPassword = bcrypt.hash(password, 10);

    const user = await userModel.create({ email, userName, password: hashPassword, bio, profileImage });

    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    res.cookie('token', token);

    res.status(201).json({
        msg: 'register successfully',
        user: {
            id: user._id,
            email: user.email,
            userName: user.userName,
            bio: user.bio,
            profileImage: user.profileImage,
        },
    });
}

module.exports = {
    registerController,
};
