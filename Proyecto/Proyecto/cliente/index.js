import express from 'express';
import sequelize from './src/config/bd.js';
import clienteRoutes from './src/routes/clienteRoutes.js';

const app = express();
app.use(express.json());

app.use('/clientes', clienteRoutes);

const PORT = process.env.PORT_EXPRESS;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
});
