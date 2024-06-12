import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, Index } from "typeorm";
import bcrypt from "bcrypt";

// Entidad de usuario
@Entity()
class User {
  @PrimaryGeneratedColumn("uuid")
  @Index()
  id: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 60 }) // Longitud suficiente para almacenar la contraseña cifrada
  password: string;

  @Column({ nullable: true, type: "text" })
  refreshToken: string;

  // Método para cifrar la contraseña antes de insertarla en la base de datos
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}

export default User;
