import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("flights")
export class FlightEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  distance: number;
}
