
const express = require('express');
const router = express.Router();
//Todas las fcnes de esta ruta estan en:
const { get_All_Data } = require('../controller_const_api/functions_controller')

///  RUTA (GET)  /DOGS   y query ?=name:
router.get('/', async (req, res) => {  //   RUTA /dogs ( total y x query name)
	const { name } = req.query;   //raza por query!!!

	const allData = await get_All_Data();   //fc q devuelve la info de la Api y de la BD concatenada en un array de {}

	const dataPpal = await allData.map(el => {  // para devolver solo la info de la ruta ppal

		if (el.hasOwnProperty('createInDb')) {  //si es de la BD
			let tp = el.Temperaments.map(t => t.nameTemp); //convierte los Temps asociados en un array
			return {
				id: el.id,//para poder tomar la id
				name: el.name,
				temperament: tp.join(', '), // muestra el array como string
				createInDb: el.createInDb,
				weight: el.weight,
				image: el.image
			}
		} else {//es de la Api

			return {
				id: el.id,
				name: el.name,
				temperament: el.temperament,
				image: el.image,
				weight: el.weight
			}
		}
	});
	if (name) {  // si hay query
		let dogNames = await dataPpal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));

		if (dogNames.length > 0) {
			res.status(200).json(dogNames);  //es un arary de las coincidencias
		}
		else {
			res.status(200).send(["error"])
		}
	} else {  //si no hay query
		res.status(200).json(dataPpal);
	}
})

module.exports = router;



