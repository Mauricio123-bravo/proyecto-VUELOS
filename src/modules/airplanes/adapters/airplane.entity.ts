import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FlightEntity } from "../../flights/adapters/flight.entity";
import { MaintenanceEntity } from "../../maintenances/adapters/maintenance.entity";

@Entity("airplanes")
export class AirplaneEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  modelYear: string;

  @Column({ type: "int", nullable: false })
  capacity: number;

  @Column({ type: "boolean", nullable: false })
  status: boolean;

  @OneToMany(() => FlightEntity, (flight) => flight.airplane)
  flights: FlightEntity[];

  @OneToMany(() => MaintenanceEntity, (maintenance) => maintenance.airplane)
  maintenances: MaintenanceEntity[];
}
