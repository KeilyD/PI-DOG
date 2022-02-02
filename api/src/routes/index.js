const { Router } = require('express');
const dogs = require('./dogs_get_01_02');
const idRaza = require('./dogs_idRaza_get_03');
const temperament = require('./temperament_get_04');
const dogs_post = require('./dogs_post_05');
// Haca viene los routes desde api_router
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogs);
router.use('/:idRaza', idRaza);
router.use('/temperament', temperament);
router.use('/dogs', dogs_post);

// hacemos uso de los middelerware//
// me genera barra /api y todo lo que trae consigo
module.exports = router;
