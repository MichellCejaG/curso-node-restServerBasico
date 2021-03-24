
const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) =>{
  //Verificar formato de correo
  const errors = validationResult(req);
  
  if (!errors.isEmpty()){
    return res.status(400).json(errors);
  }

  next();//sigue con el siguiente middleware
  
}

module.exports = {
    validarCampos
}