const axios = require("axios");
const { URL_BASE, API_KEY } = require("./constants");
const { Dog, Temperament } = require("../db"); // me traigo los modelos

//FUNCIONES QUE UTILIZA LA RUTA /Dogs

const get_Info_API = async () => {
	// Fc para obtener todas las razas de la API
	try {
		const url_Api = await axios.get(`${URL_BASE}breeds?api_key=${API_KEY}`);

		const info_Api = url_Api.data.map((el) => {
			return {
				id: el.id,
				name: el.name,
				height: el.height.metric,
				image: el.image.url,
				life_span: el.life_span,
				temperament: el.temperament,
				weight: el.weight.metric,

			};
		});
		return info_Api;
	} catch (error) {
		return "No se ha establecido conexion con la API", error;
	}
};

const get_Info_DB = async () => {
	// fc para obtener todos las razas de la B Datos, junto con los temperamentos
	try {
		const dogs_DB = await Dog.findAll({
			include: Temperament,
		});
		const db_Datos = dogs_DB.map((d) => d.dataValues); //(obtener solo el DataValue de cada obj de dogsDB)
		return db_Datos;
	} catch (error) {
		return "No se pudo establecer conexion a la BD", error;
	}
};

const get_All_Data = async () => {
	//concatena lo de la api + lo de la BD
	try {
		const api_Info = await get_Info_API();
		const db_Info = await get_Info_DB();
		const all_Info = db_Info.concat(api_Info);
		return all_Info;
	} catch (error) {
		return "error en la obtencion de la informacion", error;
	}
};

const get_ById_API = async function (idRaza) {
	// funcion que busca una raza x id en la Api

	const all_Dogs = await get_Info_API();
	for (let i = 0; i < all_Dogs.length; i++) {
		if (all_Dogs[i].id === Number(idRaza)) {
			return all_Dogs[i];
		}
	}
};

const get_ById_BD = async function (idRaza) {
	// Para encontrar un dog en la BD x id UUIV
	try {
		const Dog_BD = await Dog.findByPk(idRaza, {
			include: Temperament,
		});
		if (Dog_BD) {
			const tp = Dog_BD.Temperaments.map((t) => t.dataValues.nameTemp); //guerda los temps asociados en un array(tp)

			const dogDetail = {
				//seteo un objeto ppara devolver los datos listos
				name: oneDogBD.name,
				height: oneDogBD.height,
				weight: oneDogBD.weight,
				life_span: oneDogBD.life_span,
				temperament: tp.join(", "), //al array tp , lo muestra como string
				image: oneDogBD.image,
			};

			return dogDetail;
		}
	} catch (error) {
		return null;
	}
};

const addTemperaments = async function (t, d) {
	// agrega los temperamentos pasados en el array, al crear un dog

	t = capitalizar(t);
	const [temp] = await Temperament.findOrCreate({
		where: { nameTemp: t },
	});
	await d.addTemperaments(temp); //vincula el perro con el temperamento
	//await temp.addDogs(d); //vincula el temperamento con el perro
};

const capitalizar = function (str) {
	// capitaliza un string
	return str.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
};

module.exports = {
	get_Info_API,
	get_Info_DB,
	get_All_Data,
	get_ById_API,
	get_ById_BD,
	addTemperaments,
	capitalizar,
};
