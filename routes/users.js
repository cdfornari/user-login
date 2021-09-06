const { Router, request } = require('express');
const { check } = require('express-validator');

const { validRole, emailExists, userIdExists } = require('../helpers/db-validators');

const {
    validateUser,
    validateJWT,
    validateAdminRole,
    validateRole
} = require('../middlewares')

const { userGet,
        userPost,
        userPut,
        userDelete,
        userPatch 
} = require('../controllers/users');



const router = Router();

router.get('/', userGet)

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe tener mínimo 6 caracteres').isLength({min: 6}),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(emailExists),
    //check('role', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom(validRole), //= (role) => validRole(role)
    validateUser
], userPost)

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(userIdExists),
    check('role').custom(validRole),
    validateUser
], userPut)

router.delete('/:id', [
    validateJWT,
    //validateAdminRole,
    validateRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(userIdExists),
    validateUser
],
userDelete)

router.patch('/', userPatch)


module.exports = router;