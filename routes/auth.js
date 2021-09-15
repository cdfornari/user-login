const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const { login, googleSignIn, verifyJwt } = require('../controllers/auth');
const { validateUser } = require('../middlewares/user-validation');

const router = Router();

router.post('/login',[
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateUser
],login);

router.post('/google',[
    check('id_token', 'El token de Google es obligatorio').not().isEmpty(),
    validateUser
],googleSignIn);

router.post('/verify',verifyJwt)


module.exports = router;