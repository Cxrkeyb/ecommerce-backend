import { connection } from "..";
import { Product } from "@entities/index";

const productRepository = connection.getRepository(Product);

export { productRepository as ProductRepository };
