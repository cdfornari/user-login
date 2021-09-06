const { validationResult } = require('express-validator');


const validateUser = (req,res,next)=>{
    const errors = validationResult(req); //valeResult viene de los check MW
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    next(); //next middleware/controller
}


module.exports = {
    validateUser
}