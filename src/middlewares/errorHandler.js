const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log do erro para depuração

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Erro interno do servidor.';

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
};

export default errorHandler;