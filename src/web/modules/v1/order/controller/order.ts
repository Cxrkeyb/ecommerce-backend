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
    const { products } = req.body;

    // Validar los datos de entrada
    if (!products || products.length === 0) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const users = await UserRepository.find({
      take: 1
    });

    const user = users[0];

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
        product,
        quantity: products.find((p: any) => p.id === product.id).quantity
      });
    });

    // Reduce el stock de los productos
    existingProducts.forEach(async (product) => {
      await ProductRepository.update(product.id, {
        stock: product.stock - products.find((p: any) => p.id === product.id).quantity
      });
    });

    res.status(201).json({
      message: "Orden creada exitosamente",
      order: {
        id: orderId,
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
    const [orders, totalOrders] = await OrderRepository.findAndCount({
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
      relations: ["orderProducts", "orderProducts.product"]
    });

    const totalPages = Math.ceil(totalOrders / Number(limit));

    res.status(200).json({
      totalPages,
      data: orders.map((order) => ({
        id: order.id,
        products: order.orderProducts.map((orderProduct) => ({
          id: orderProduct.product.id,
          name: orderProduct.product.name,
          price: orderProduct.product.price,
          quantity: orderProduct.quantity
        })),
        total: order.orderProducts.reduce(
          (acc, orderProduct) => acc + orderProduct.product.price * orderProduct.quantity,
          0
        ),
        status: order.status
      }))
    });
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
    const order = await OrderRepository.findOne({
      where: { id },
      relations: ["orderProducts", "orderProducts.product"]
    });

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

    await OrderProductRepository.delete({ order: { id } });

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
    const { status } = req.body;

    const order = await OrderRepository.findOne({ where: { id } });

    if (!order) {
      return res.status(400).json({ message: "La orden no existe" });
    }

    if (status !== "pending" && status !== "completed" && status !== "cancelled") {
      return res.status(400).json({ message: "Estado de la orden inválido" });
    }

    // Actualizar solo el estado de la orden
    await OrderRepository.update(id, { status });

    res.status(200).json({
      message: "Estado de la orden actualizado exitosamente",
      data: {
        id,
        user: order.user,
        status
      }
    });
  } catch (error) {
    console.log("Error al actualizar el estado de la orden:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
