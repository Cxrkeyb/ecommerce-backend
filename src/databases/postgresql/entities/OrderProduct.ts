import { Entity, PrimaryGeneratedColumn, Index, ManyToOne, JoinColumn, Column } from "typeorm";
import Product from "./Product";
import Order from "./Order";

// Entidad de Order Product
@Entity()
class OrderProduct {
  @PrimaryGeneratedColumn("uuid")
  @Index()
  id: string;

  @Column({ type: "int" })
  quantity: number;

  // Relation with order
  @ManyToOne(() => Order, (order) => order.orderProducts)
  @JoinColumn({ name: "order_id" })
  order: Order;

  // Relation with product
  @ManyToOne(() => Product, (product) => product.orderProducts)
  @JoinColumn({ name: "product_id" })
  product: Product;
}

export default OrderProduct;
