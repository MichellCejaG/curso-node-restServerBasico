
const {response} = require('express');
const bcryptjs = require ('bcryptjs');
const Usuario = require('../models/usuario');

const usersGet = async (req, res = response) => {

    const {limite = 5, desde =0} = req.query;

    const [total, usuarios] = await Promise.all([
      Usuario.countDocuments({estado: true}),
      Usuario.find({estado: true})
      .skip(Number(desde))
    .limit(Number(limite))


    ]);

    res.json({
  
     total,
     usuarios
    });
  }

 const usersPut = async(req, res = response) => {
     const id = req.params.id;
     const {_id, password, google,correo, ...resto} = req.body;

     //Todo validar contra bd

     if(password){
      const salt = bcryptjs.genSaltSync();//Vueltas para la dificultad de encriptación
      resto.password = bcryptjs.hashSync(password, salt);//Encriptarlo en una sola vía
  
     }

     const usuarioDB = await Usuario.findByIdAndUpdate(id, resto);
    res.json({
       
        usuarioDB
    });
  }

  const usersPost = async (req, res = response) => {
  

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol}); 

    //Verificar si el correo existe 
    

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();//Vueltas para la dificultad de encriptación
    usuario.password = bcryptjs.hashSync(password, salt);//Encriptarlo en una sola vía

    //Guardar en bd
    await usuario.save();

    res.json({
        msg: 'post API -- Controlador',
        usuario
    });
  }

  const usersDelete =  async(req, res = response) => {

    const {id} = req.params;

    //Borrar fisicamente
    //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
    res.json(usuario)
  }

 const usersPatch = (req, res =response) => {
    res.json({
        msg: 'patch API -- Controlador'
    })
  }

  module.exports = {
    usersGet, 
    usersPut, 
    usersPost,
    usersPatch,
    usersDelete
  }