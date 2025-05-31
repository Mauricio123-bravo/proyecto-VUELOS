import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LocatedEntity } from "../../located/adapters/located.entity";
import { FlightEntity } from "../../flights/adapters/flight.entity";

@Entity("runway")
export class RunwayEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "double precision", nullable: false })
  length: number;

  @Column({ type: "double precision", nullable: false })
  width: number;

  @Column({ type: "boolean", nullable: false })
  status: boolean;

  @ManyToOne(() => LocatedEntity, (located) => located.runways, {onDelete:"CASCADE"})
  @JoinColumn({ name: "located_id" })
  location: LocatedEntity;

  @OneToMany(() => FlightEntity, (flight) => flight.origin)
  flightsOrigin: FlightEntity[];

  @OneToMany(() => FlightEntity, (flight) => flight.destination)
  flightsDestination: FlightEntity[];
}