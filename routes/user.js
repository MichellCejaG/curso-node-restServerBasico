
const {Router} = require('express');
const { check } = require('express-validator');
const {esRoleValido, existeEmail,existeUsuarioID} = require ('../helpers/db-validators');
const {usersGet,usersPut, 
    usersPost,
    usersPatch,
    usersDelete} = require('../controllers/users');
const {validarCampos} = require('../middlewares/validar-campos');
const router =  Router();


router.get('/', usersGet);

 router.put('/:id', [
   check('id', "No es un id validoo").isMongoId(),
   check("id").custom(existeUsuarioID),
   check('rol').custom(esRoleValido),
   validarCampos
 ],usersPut);

  router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio y mas de 6 caracteres').isLength({min:6}),
    check('correo', 'Formato incorrecto').isEmail(),//verifica el formato de correo
    check('correo').custom(existeEmail),
    //check('rol','No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos


    ],usersPost);

  router.delete('/:id',[
    check('id', "No es un id validoo").isMongoId(),
    check("id").custom(existeUsuarioID),
    validarCampos

  ], usersDelete);

  router.patch('/', usersPatch);





module.exports = router;

