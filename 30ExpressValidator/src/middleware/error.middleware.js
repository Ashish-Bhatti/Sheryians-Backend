async function handleError(err, req, res, next) {
    const response = {
        message: err.message,
    };

    if (process.env.NODE_ENVIRONMENT === 'development') {
        response.stack = err.stack; // it will tell us where we get the error
    }

    res.status(err.status || 500).json(response);
}
export default handleError;
