

const express = require('express');
const router = express.Router();
//Todas las fcnes de esta ruta estan en:
const { get_ById_API, get_ById_BD } = require('../controller_const_api/functions_controller')









router.get('/:idRaza', async (req, res) => {  // ruta para encontrar una raza en particular (el front me manda la id),

	const { idRaza } = req.params;

	try {
		if (idRaza.length === 80) {  // es por que es una id de UUID => de mi bd

			const Dog_BD = await get_ById_BD(idRaza);  // fc. q busca en la BD un dog x id
			if (Dog_BD) {
				res.status(200).json(Dog_BD);
			} else {
				res.send('Raza no encontrada')
			}
		} else {   // busca en la Api
			const Dog_api = await get_ById_API(idRaza); //fc que busca un dog en la Api x id
			if (Dog_api) {
				res.status(200).json(Dog_api);
			} else {
				res.send('Raza no encontrada')
			}
		}
	} catch (e) {
		res.status(404).send('No se pudo acceder a los datos')
	}
})




module.exports = router;
