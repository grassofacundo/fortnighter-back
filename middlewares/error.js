exports.errorHandler = (error, req, res, next) => {
    console.error(error);
    const status = error.statusCode || 500;
    const { message, data } = error;
    res.status(status).json({ message, data });
};
