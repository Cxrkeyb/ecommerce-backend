import { connection } from "..";
import { OrderProduct } from "@entities/index";

const orderProductRepository = connection.getRepository(OrderProduct);

export { orderProductRepository as OrderProductRepository };
