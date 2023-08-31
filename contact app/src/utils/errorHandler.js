// const CustomError = require("./customError")

const ErrorHandler = (error, req, res, next) => {
        console.log("err",error);
        error.statusCode = error.statusCode || 500
        error.status = error.status || "error"
        res.status(error.statusCode).send({
            status: error.status,
            message: error.message
        }) 
    

}

module.exports = ErrorHandler