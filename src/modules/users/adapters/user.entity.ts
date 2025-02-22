import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 120, nullable: false })
  email: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  username: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  password: string;
}
