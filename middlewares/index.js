const userValidation  = require('../middlewares/user-validation');
const validateJWT = require('../middlewares/validate-jwt');
const rolesValidations = require('../middlewares/validate-role');

module.exports = {
    ...userValidation,
    ...validateJWT,
    ...rolesValidations,
}