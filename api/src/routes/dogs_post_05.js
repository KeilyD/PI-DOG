
const express = require('express');
const router = express.Router();
//Todas las fcnes de esta ruta estan en:
const { Dog } = require('../db')
const { addTemperaments, capitalizar } = require('../controller_const_api/functions_controller')







// RUTA (POST)  /DOGS
router.post('/', async (req, res) => {
	var { name, height, weight, life_span, temperaments, image } = req.body; //!! temperaments es un array

	if (!name || !height || !weight) { //campos allowNull: false
		return res.send('faltan datos ')
	}
	name = capitalizar(name);  //fc q capitaliza string
	try {
		const [dog, created] = await Dog.findOrCreate({
			where: {
				name: name,
			},
			defaults: {
				height: height,
				weight: weight,
				life_span: life_span,
				image: image
			}
		});
		if (created === true && temperaments !== undefined) { //se crean los temperaments pasados x body
			temperaments.forEach(te => {
				addTemperaments(te, dog);  // agrega los temps en la tabla Temperament y los asocia al dog
			})
		}
		res.status(200).send("Raza creada con éxito");
	}
	catch (e) {
		res.status(404).send('Error, Raza no creada', e)
	};
});


module.exports = router;
