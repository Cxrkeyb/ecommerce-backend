import { connection } from "..";
import { Order } from "@entities/index";

const orderRepository = connection.getRepository(Order);

export { orderRepository as OrderRepository };
