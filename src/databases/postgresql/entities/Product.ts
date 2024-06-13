import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
  UpdateDateColumn
} from "typeorm";
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

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Product;
