import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FlightEntity } from "../../flights/adapters/flight.entity";

@Entity("airplanes")
export class AirplaneEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  modelYear: string; 

  @Column({ type: "varchar", length: 100, nullable: false })
  capacity: string; 

  @Column({ type: "boolean", nullable: false })
  status: boolean; 

  @OneToMany(() => FlightEntity, (flight) => flight.airplane)
  flights: FlightEntity[]; 
}
