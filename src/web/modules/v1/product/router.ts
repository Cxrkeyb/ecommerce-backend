import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct
} from "./controller/product";

const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: Productos
 *     description: Operaciones relacionadas con productos
 */

/**
 * @openapi
 * /v1/products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
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
 *         description: Número de productos por página
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 *       '500':
 *         description: Error interno del servidor
 */

/**
 * @openapi
 * /v1/products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del producto
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       '400':
 *         description: Producto no encontrado
 *       '500':
 *         description: Error interno del servidor
 */

/**
 * @openapi
 * /v1/products:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       '201':
 *         description: Creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       '400':
 *         description: Solicitud incorrecta
 *       '500':
 *         description: Error interno del servidor
 */

/**
 * @openapi
 * /v1/products/{id}:
 *   put:
 *     summary: Actualizar un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       '400':
 *         description: Producto no encontrado
 *       '500':
 *         description: Error interno del servidor
 */

/**
 * @openapi
 * /v1/products/{id}:
 *   delete:
 *     summary: Eliminar un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del producto
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       '400':
 *         description: Producto no encontrado
 *       '500':
 *         description: Error interno del servidor
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Producto:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *         - stock
 *         - image
 *       properties:
 *         id:
 *           type: string
 *           description: El ID generado automáticamente del producto
 *         name:
 *           type: string
 *           description: Nombre del producto
 *         description:
 *           type: string
 *           description: Descripción del producto
 *         price:
 *           type: number
 *           description: Precio del producto
 *         stock:
 *           type: integer
 *           description: Cantidad de stock del producto
 *         image:
 *           type: string
 *           description: URL de la imagen del producto
 *       example:
 *         id: d5fE_asz
 *         name: "Apple iPhone 13"
 *         description: "Último modelo de Apple iPhone"
 *         price: 999.99
 *         stock: 100
 *         image: "https://example.com/image.jpg"
 */

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
