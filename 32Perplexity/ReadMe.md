// Inside Mongoose document middleware and document methods:
//
// this === current user document
//
// Example:
// const user = await User.findById(id);
//
// user.comparePassword("123456");
//
// Inside comparePassword():
// this === user
// this.password === user.password