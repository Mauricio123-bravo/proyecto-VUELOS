import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AirplaneEntity } from "../../airplanes/adapters/airplane.entity";
import { RunwayEntity } from "../../runways/adapters/runway.entity";
import { UserFlightEntity } from "../../userFlights/adapters/userFlight.entity";
import { PilotEntity } from "../../pilots/adapters/pilot.entity";

@Entity("flights")
export class FlightEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamp", nullable: false })
  departureDate: Date;

  @Column({ type: "timestamp", nullable: false })
  arrivalDate: Date;

  @Column({ type: "boolean", nullable: false })
  status: boolean;

  @ManyToOne(() => AirplaneEntity, (airplane) => airplane.flights)
  @JoinColumn({ name: "airplane_id" })
  airplane: AirplaneEntity;

  @ManyToOne(() => PilotEntity, (pilot) => pilot.flights)
  @JoinColumn({ name: "pilot_id" })
  pilot: PilotEntity;

  @ManyToOne(() => RunwayEntity, (runaway) => runaway.flightsOrigin)
  @JoinColumn({ name: "origin_id" })
  origin: RunwayEntity;

  @ManyToOne(() => RunwayEntity, (runaway) => runaway.flightsDestination)
  @JoinColumn({ name: "destination_id" })
  destination: RunwayEntity;

  @OneToMany(() => UserFlightEntity, (userFlight) => userFlight.flight)
  usersFlight: UserFlightEntity[];

  @Column({ type: "double precision", nullable: false })
  distance: number;

}
