import { ProductRepository } from "@/databases/postgresql/repos";
import { Request, Response } from "express";

/**
 * Crea un nuevo producto.
 * @param req El objeto de solicitud de Express.
 * @param res El objeto de respuesta de Express.
 * @returns Devuelve el objeto de el producto creado.
 */
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock, image } = req.body;

    // Validar los datos de entrada
    if (!name || !description || !price || !stock || !image) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    // Verificar si el producto ya existe
    const existingProduct = await ProductRepository.findOne({ where: { name } });
    if (existingProduct) {
      return res.status(409).json({ message: "El producto ya existe" });
    }

    // Crear el producto
    const product = await ProductRepository.insert({
      name,
      description,
      price,
      stock,
      image
    });

    res.status(201).json({
      message: "Producto creado exitosamente",
      product: {
        name,
        description,
        price,
        stock,
        image
      }
    });
  } catch (error) {
    console.log("Error al crear el producto:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/**
 * Actualiza un producto existente.
 * @param req El objeto de solicitud de Express.
 * @param res El objeto de respuesta de Express.
 * @returns Devuelve el objeto de el producto actualizado.
 */
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, image } = req.body;

    const product = await ProductRepository.findOne({ where: { id } });

    if (!product) {
      return res.status(400).json({ message: "El producto no existe" });
    }

    await ProductRepository.update({ id }, { name, description, price, stock, image });
    res.status(200).json(product);
  } catch (error) {
    console.log("Error al actualizar el producto:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/**
 * Elimina un producto existente.
 * @param req El objeto de solicitud de Express.
 * @param res El objeto de respuesta de Express.
 * @returns Devuelve el objeto de el producto eliminado.
 */
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await ProductRepository.findOne({ where: { id } });

    if (!product) {
      return res.status(400).json({ message: "El producto no existe" });
    }

    await ProductRepository.delete({ id });
    res.status(200).json(product);
  } catch (error) {
    console.log("Error al eliminar el producto:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/**
 * Obtiene todos los productos con paginación y filtros.
 * @param req El objeto de solicitud de Express.
 * @param res El objeto de respuesta de Express.
 * @returns Devuelve un array de productos.
 */
export const getProducts = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const products = await ProductRepository.find({
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit)
    });

    res.status(200).json(products);
  } catch (error) {
    console.log("Error al obtener los productos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/**
 * Obtiene un producto por su ID.
 * @param req El objeto de solicitud de Express.
 * @param res El objeto de respuesta de Express.
 * @returns Devuelve el objeto de el producto encontrado.
 */
export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await ProductRepository.findOne({ where: { id } });

    if (!product) {
      return res.status(400).json({ message: "El producto no existe" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log("Error al obtener el producto:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
