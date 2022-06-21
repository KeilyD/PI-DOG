const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		"Temperament",
		{
			nameTemp: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,

			},
		},
		{
			timestamps: false,
		}
	);
};

/*utilizamos a sequelize para definir las tablas de base de datos
	we use sequelize to define the database tables */

// const { DataTypes } = require('sequelize');
// // Exportamos una funcion que define el modelo
// // Luego le injectamos la conexion a sequelize.
// module.exports = (sequelize) => {
// 	// defino el modelo
// 	sequelize.define("Temperament", {

// 		nameTemp: {
// 			type: DataTypes.STRING,
// 			allowNull: false,
// 			unique: true
// 		},
// 		timestamps: false
// 	});
// }
