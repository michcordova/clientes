import express from "express";
import { createCliente, getAllClientes, updateCliente, deleteCliente, loginCliente } from "../controllers/clienteControllers.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: The clientes managing API
 * /api/clientes/all:  // Cambié "/clientes" a "/clientes"
 *  get:
 *   summary: Get all Clientes
 *   tags: [Clientes]
 *   responses:
 *     '200':
 *        description: A successful response
 */
router.get('/all', getAllClientes);

/**
 * @swagger
 * /api/clientes/createclient:  // Cambié "/clientes" a "/clientes"
 *  post:
 *   summary: Create a new Client
 *   tags: [Clientes]
 *   requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the client
 *               email:
 *                 type: string
 *                 description: Email of the client
 *               password:
 *                 type: string
 *                 description: Password for the client
 *   responses:
 *     '201':
 *        description: Client created successfully
 */
router.post('/createclient', createCliente);

/**
 * @swagger
 * /api/clientes/updateclient/{id}:  // Cambié "/clientes" a "/clientes"
 *  patch:
 *   summary: Update a Client
 *   tags: [Clientes]
 *   parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the client to update
 *         schema:
 *           type: string
 *   requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *   responses:
 *     '200':
 *        description: Client updated successfully
 */
router.patch('/updateclient/:id', updateCliente);

/**
 * @swagger
 * /api/clientes/deleteclient/{id}:  // Cambié "/clientes" a "/clientes"
 *  patch:
 *   summary: Soft delete a Client
 *   tags: [Clientes]
 *   parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the client to delete
 *         schema:
 *           type: string
 *   responses:
 *     '200':
 *        description: Client deleted successfully
 */
router.patch('/deleteclient/:id', deleteCliente);

router.post('/login', loginCliente);

export default router;
