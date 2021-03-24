
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') =>{

    const existeRol = await Role.findOne({rol});
    if(!existeRol){
      throw new Error(`El rol ${rol} no está registrado en la BD`)
    }
}

const existeEmail = async (correo = '') =>{
 
 const existeEmail = await Usuario.findOne({correo});
  if(existeEmail){
    throw new Error(`El correo ${correo} ya está registrado en la BD`)

  }
}

const existeUsuarioID = async (id) =>{
 
  const existeID = await Usuario.findById(id);
   if(!existeID){
     throw new Error(`El correo ${id} ya está registrado en la BD`)
 
   }
 
 }


module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioID
}

