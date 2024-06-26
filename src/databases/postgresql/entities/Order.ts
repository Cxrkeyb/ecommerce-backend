import { Entity, PrimaryGeneratedColumn, Index, ManyToOne, OneToMany, Column } from "typeorm";
import User from "./User";
import OrderProduct from "./OrderProduct";

@Entity()
class Order {
  @PrimaryGeneratedColumn("uuid")
  @Index()
  id: string;

  @Column({
    enum: ["pending", "completed", "cancelled"],
    default: "pending"
  })
  status: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  // Relation with order products
  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
  orderProducts: OrderProduct[];
}

export default Order;
