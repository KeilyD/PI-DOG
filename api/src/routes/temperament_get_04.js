const express = require('express');
const router = express.Router();
const axios = require('axios');
const { URL_BASE, API_KEY } = require('../controller_const_api/constants')
const { Temperament } = require('../db');  // me traigo los modelos


const get_TempAPI = async () => {  // para obtener todas los temperamentos de la Api
	try {
		const url_Api = await axios.get(`${URL_BASE}breeds?api_key=${API_KEY}`);

		const tempApi = url_Api.data.map(el => el.temperament) //tempApi es una array de strins, cada string tiene varios temperamentos

		var arrayTemp = [];
		var arrayTemp2 = []
		var long = tempApi.length;

		for (let i = 0; i < long; i++) {
			if (!tempApi[i]) continue;
			let spl = tempApi[i].split(',');   // un spl es un array de temperamentos de cada dog
			for (let j = 0; j < spl.length; j++) {
				let tNorm = spl[j].trim();
				if (arrayTemp2.includes(tNorm)) continue; // para que no se repitan los temperamentos
				arrayTemp2.push(tNorm);
				arrayTemp.push({ nameTemp: tNorm });
			}
		}
		return arrayTemp;
	} catch (error) {
		return ('No se pudo conectar a la API', error)
	}
}
//RUTA /temperament

router.get('/', async (req, res) => {

	try {
		const count = await Temperament.count();     //cuento si hay - de 100 registros es xq aun no se trajeron los temps de la Api
		console.log('HAY REGISTROS: ', count)

		if (count < 100) {
			const temperamentsApi = await get_TempAPI();
			await Temperament.bulkCreate(temperamentsApi); //se llena la tabla con los temperamentos de la tabla
		}
	} catch (error) { res.status(404).send('error al crear datos') }

	try {
		const temperaments = await Temperament.findAll({
			order: [['nameTemp', 'ASC'],]  //lo devuelvo ordenado alfabéticamente
		})

		console.log(temperaments)
		res.json(temperaments);
	} catch (error) {
		return ('No se pudo acceder a la BD', error)
	}
})



module.exports = router;
