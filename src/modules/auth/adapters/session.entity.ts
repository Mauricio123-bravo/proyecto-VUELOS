import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../users/adapters/user.entity";

@Entity("sessions")
export class SessionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 300 })
  token: string;

  @Column({ default: false })
  revoked: boolean = false;

  @Column({ length: 15 })
  ipAddress: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;
}
