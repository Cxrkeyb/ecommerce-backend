import { OrderRepository, ProductRepository, UserRepository } from "@/databases/postgresql/repos";
import { OrderProductRepository } from "@/databases/postgresql/repos/OrderProduct";
import { Request, Response } from "express";

/**
 * Crea una nueva orden.
 * @param req El objeto de solicitud de Express.
 * @param res El objeto de respuesta de Express.
 * @returns Devuelve el objeto de la orden creada.
 */
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, products } = req.body;

    console.log("userId", userId);

    // Validar los datos de entrada
    if (!userId || !products || products.length === 0) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const user = await UserRepository.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const productIds = products.map((product: any) => product.id);

    const existingProducts = await ProductRepository.findByIds(productIds);

    if (existingProducts.length !== productIds.length) {
      return res.status(400).json({ message: "Uno o más productos no existen" });
    }

    const order = await OrderRepository.insert({
      user
    });

    const orderId = order.identifiers[0].id;

    // Por cada producto, se crea un OrderProduct
    existingProducts.forEach(async (product) => {
      await OrderProductRepository.insert({
        order: {
          id: orderId
        },
        product
      });
    });

    // Reduce el stock de los productos
    existingProducts.forEach(async (product) => {
      await ProductRepository.update(product.id, {
        stock: product.stock - 1
      });
    });

    res.status(201).json({
      message: "Orden creada exitosamente",
      order: {
        user,
        products: existingProducts
      }
    });
  } catch (error) {
    console.log("Error al crear la orden:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/**
 * Obtiene todas las órdenes con paginación y filtros.
 * @param req El objeto de solicitud de Express.
 * @param res El objeto de respuesta de Express.
 * @returns Devuelve un array de órdenes.
 */
export const getOrders = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const orders = await OrderRepository.find({
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
      relations: ["orderProducts", "orderProducts.product"]
    });

    res.status(200).json(orders);
  } catch (error) {
    console.log("Error al obtener las órdenes:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/**
 * Obtiene una orden por su ID.
 * @param req El objeto de solicitud de Express.
 * @param res El objeto de respuesta de Express.
 * @returns Devuelve el objeto de la orden encontrada.
 */
export const getOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await OrderRepository.findOne({ where: { id } });

    if (!order) {
      return res.status(400).json({ message: "La orden no existe" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.log("Error al obtener la orden:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/**
 * Elimina una orden existente.
 * @param req El objeto de solicitud de Express.
 * @param res El objeto de respuesta de Express.
 * @returns Devuelve el objeto de la orden eliminada.
 */
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await OrderRepository.findOne({ where: { id } });

    if (!order) {
      return res.status(400).json({ message: "La orden no existe" });
    }

    await OrderRepository.delete({ id });
    res.status(200).json(order);
  } catch (error) {
    console.log("Error al eliminar la orden:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId, products } = req.body;

    const order = await OrderRepository.findOne({ where: { id } });

    if (!order) {
      return res.status(400).json({ message: "La orden no existe" });
    }

    if (userId) {
      const user = await UserRepository.findOne({ where: { id: userId } });

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      order.user = user;
    }

    if (products) {
      const productIds = products.map((product: any) => product.id);

      const existingProducts = await ProductRepository.findByIds(productIds);

      if (existingProducts.length !== productIds.length) {
        return res.status(400).json({ message: "Uno o más productos no existen" });
      }

      // order.orderProducts = existingProducts;
    }

    await OrderRepository.save(order);
  } catch (error) {
    console.log("Error al actualizar la orden:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
