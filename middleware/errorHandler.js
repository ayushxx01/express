const {constants} = require("../utils/constants");

const errorHandler = (err,req,res,next)=> {
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode: 500;
    switch(statusCode){
        case constants.NOT_FOUND: {
            res.json({
                title: "Not Found",
                message: err.message,
            });
        }
        break;
        case constants.FORBIDDEN: {
            res.json({
                title: "Forbidden",
                message: err.message
            });
        }
        break;
        case constants.SERVER_ERROR: {
            res.json({
                title: "Server error",
                message: err.message
            })
        }
        break;
        case constants.UNAUTHORISED: {
            res.json({
                title: "Unauthorized",
                message :err.message
            })
        }
        break;
        case constants.VALIDATION_ERROR: {
            res.json({
                title: "Validation error",
                message: err.message
            })
        }
        break;
        default: {
            res.json({
                title:"Server error",
                
            }) 
        }
        break;
    }

}

module.exports = errorHandler;