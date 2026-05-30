export async function register(req, res, next) {
    /* try {
        const err = new Error('Invalid credentials');
        err.status = 401;

        throw err;
    } catch (err) {
        next(err);
    } */

        res.status(201).json({
            message : 'registered successfully'
        })
}
