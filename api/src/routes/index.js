const { Router } = require('express');


// Haca viene los routes desde api_router
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const dogs = require('./dogs.js');        ////////
const temperament = require ('./temperament.js')/////////
//const dog= require ('./dog.js') /////////////

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogs);//////
router.use('/temperament', temperament);///////

// hacemos uso de los middelerware//
// me genera barra /api y todo lo que trae consigo
module.exports = router;
