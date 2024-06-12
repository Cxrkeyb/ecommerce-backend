import express from "express";
import { createOrder, deleteOrder, getOrder, getOrders, updateOrder } from "./controller/order";

const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: Órdenes
 *     description: Operaciones relacionadas con órdenes
 */

/**
 * @openapi
 * /v1/orders:
 *   get:
 *     summary: Obtener todas las órdenes
 *     tags: [Órdenes]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página para la paginación
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número de órdenes por página
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Orden'
 *       '500':
 *         description: Error interno del servidor
 */

/**
 * @openapi
 * /v1/orders/{id}:
 *   get:
 *     summary: Obtener una orden por ID
 *     tags: [Órdenes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID de la orden
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Orden'
 *       '400':
 *         description: Orden no encontrada
 *       '500':
 *         description: Error interno del servidor
 */

/**
 * @openapi
 * /v1/orders:
 *   post:
 *     summary: Crear una nueva orden
 *     tags: [Órdenes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Orden'
 *     responses:
 *       '201':
 *         description: Creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Orden'
 *       '400':
 *         description: Solicitud incorrecta
 *       '500':
 *         description: Error interno del servidor
 */

/**
 * @openapi
 * /v1/orders/{id}:
 *   put:
 *     summary: Actualizar una orden por ID
 *     tags: [Órdenes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID de la orden
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Orden'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Orden'
 *       '400':
 *         description: Orden no encontrada
 *       '500':
 *         description: Error interno del servidor
 */

/**
 * @openapi
 * /v1/orders/{id}:
 *   delete:
 *     summary: Eliminar una orden por ID
 *     tags: [Órdenes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID de la orden
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Orden'
 *       '400':
 *         description: Orden no encontrada
 *       '500':
 *         description: Error interno del servidor
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Orden:
 *       type: object
 *       required:
 *         - userId
 *         - products
 *       properties:
 *         id:
 *           type: string
 *           description: El ID generado automáticamente de la orden
 *         userId:
 *           type: string
 *           description: ID del usuario que realizó la orden
 *         products:
 *           type: array
 *           description: Lista de productos en la orden
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID del producto
 *               quantity:
 *                 type: integer
 *                 description: Cantidad del producto en la orden
 *       example:
 *         id: d5fE_asz
 *         userId: "abc123"
 *         products:
 *           - id: "123"
 *             quantity: 2
 *           - id: "456"
 *             quantity: 1
 */

router.get("/", getOrders);
router.get("/:id", getOrder);
router.post("/", createOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;
