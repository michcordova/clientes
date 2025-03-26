import bodyParser from "body-parser";
import express from "express";
import clienteRoutes from "./routes/clienteRoutes.js";
import swaggerSpec from "./api-docs.js";
import swaggerUI from "swagger-ui-express";

const app = express();

app.use(express.json());


 app.use('/api/clientes', clienteRoutes);
 app.use('/api-docs', swaggerUI.serve,
    swaggerUI.setup(swaggerSpec));

 export default app;