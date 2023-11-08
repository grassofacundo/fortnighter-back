exports.setError = (errorMessage, errorStatusCode, errorData) => {
    const error = new Error(errorMessage);
    error.statusCode = errorStatusCode ?? 500;
    if (errorData) error.data = errorData;
    throw error;
};
