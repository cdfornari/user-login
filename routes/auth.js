const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const { login } = require('../controllers/auth');
const { validateUser } = require('../middlewares/user-validation');

const router = Router();

router.post('/login',[
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateUser
],login);


module.exports = router;