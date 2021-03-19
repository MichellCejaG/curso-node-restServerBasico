
const {response} = require('express');

const usersGet = (req, res = response) => {

    const query = req.query;

    res.json({
        msg: 'get API - controlador',
        query
    });
  }

 const usersPut = (req, res = response) => {
     const id = req.params.id;
    res.json({
        msg: 'put API -- Controlador',
        id
    })
  }

  const usersPost = (req, res = response) => {
    const body = req.body;

    res.json({
        msg: 'post API -- Controlador',
        body
    })
  }

  const usersDelete = (req, res = response) => {

    res.json({
        msg: 'delete API -- Controlador'
    
    })
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