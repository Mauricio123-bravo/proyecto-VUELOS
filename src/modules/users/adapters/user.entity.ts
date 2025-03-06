import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../models/userRol.model";
import { UserFlightEntity } from "../../userFlights/adapters/userFlight.entity";


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

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => UserFlightEntity, (userFlight) => userFlight.user)
  userFlight: UserFlightEntity[];
}
