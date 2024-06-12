import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany } from "typeorm";
import OrderProduct from "./OrderProduct";

// Entidad de producto
@Entity()
class Product {
  @PrimaryGeneratedColumn("uuid")
  @Index()
  id: string;

  @Column({ length: 50, unique: true })
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "float" })
  price: number;

  @Column({ type: "int" })
  stock: number;

  @Column({ type: "text" })
  image: string;

  // Relation with order products
  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
  orderProducts: OrderProduct[];
}

export default Product;
