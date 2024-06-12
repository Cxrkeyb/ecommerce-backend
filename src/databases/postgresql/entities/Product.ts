import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

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
}

export default Product;
