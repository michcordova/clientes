import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { DataTypes } from 'sequelize';
// import Cliente from '../models/userModel.js';
dotenv.config();

// // Verifica que las variables de entorno estén definidas
// console.log(process.env.DB_NAME);  // Asegúrate de que esta variable esté definida
// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASSWORD);
// console.log(process.env.DB_DIALECT);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',  // Asegúrate de que esta variable esté configurada
    logging: false, // Desactiva logs de SQL en consola
  }
);


const Cliente = sequelize.define('Cliente', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  apellidos: { type: DataTypes.STRING, allowNull: false },
  direccion: { type: DataTypes.STRING, allowNull: false },
  correo: { type: DataTypes.STRING, allowNull: false, unique: true },
  telefono: { type: DataTypes.STRING, allowNull: false },
  fecha_nacimiento: { type: DataTypes.DATEONLY, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
}, {
  timestamps: true,
  tableName: 'clientes'
});

export default Cliente;

// https://sequelize.org/docs/v6/core-concepts/model-basics/#model-synchronization
const initDB = async () => {
  try {
      await sequelize.authenticate();
      console.log("Conexión exitosa a la base de datos");
      await Cliente.sync({ alter: true });
      console.log("Tabla 'clientes' sincronizada correctamente");
  } catch (err) {
      console.error("Error en la conexión a la base de datos: ", err);
      process.exit(1);
  }
};

initDB();

