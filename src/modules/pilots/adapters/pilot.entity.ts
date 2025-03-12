import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FlightEntity } from "../../flights/adapters/flight.entity";

@Entity("pilots")
export class PilotEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  licence: string;

  @Column({ type: "int", nullable: false })
  experienceYears: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  rank: string;

  @Column({ type: "boolean", nullable: false })
  status: boolean;

  @OneToMany(() => FlightEntity, (flight) => flight.pilot)
  flights: FlightEntity[];

}