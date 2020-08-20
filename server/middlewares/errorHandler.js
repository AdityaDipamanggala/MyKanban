function errorHandler(err,req,res,next){
    let statusCode 
    let errMessage 
    let errorCode 

    console.log(err,`<---- error`);

    if (err.name === `SequelizeValidationError`){
        statusCode = 400
        errorCode = `VALIDATION_ERR`
        let errors = []
        for (let i = 0 ; i < err.errors.length ; i++){
            errors.push(err.errors[i].message)
        }  
        errMessage = errors  
    }
    else {
        if (err.name === `TOKEN_ERROR` || err.name === `JWT_ERROR`){
            statusCode = 401
            errorCode = err.name
            errMessage = err.message
        }
        else if (err.name === `NOT_FOUND`){
            statusCode = 404
            errorCode = err.name
            errMessage = err.message
        }
        else if (err.name === `NOT_AUTHORIZED`){
            statusCode = 403
            errorCode = err.name
            errMessage = err.message
        }
        else if (err.name === `INVALID_USER`){
            statusCode = 400
            errorCode = err.name
            errMessage = err.message
        }
        else{
            statusCode = 500
            errMessage = `Internal Server Error`
            errorCode = `INTERNAL_SERVER_ERR`
        }
    }
    console.log(errMessage);
    res.status(statusCode).json({
        status : statusCode,
        message : errMessage,
        errorCode
    })

    return next()
}
module.exports = errorHandler