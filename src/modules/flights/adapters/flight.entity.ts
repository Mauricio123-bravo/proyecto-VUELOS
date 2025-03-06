import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AirplaneEntity } from "../../airplanes/adapters/airplane.entity";
import { PilotEntity } from "../../pilots/adapters/pilot.entity";
import { TrackEntity } from "../../tracks/adapters/track.entity";
import { LocatedEntity } from "../../located/adapters/located.entity";
import { UserFlightEntity } from "../../userFlights/adapters/userFlight.entity";

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

  @ManyToOne(() => TrackEntity, (track) => track.flights)
  @JoinColumn({ name: "track_id" })
  track: TrackEntity;

  @ManyToOne(() => LocatedEntity, (located) => located.flightsOrigin)
  @JoinColumn({ name: "origin_id" })
  origin: LocatedEntity;


  @ManyToOne(() => LocatedEntity, (located) => located.flightsDestination)
  @JoinColumn({ name: "destination_id" })
  destination: LocatedEntity;

  @OneToMany(() => UserFlightEntity, (userFlight) => userFlight.flight)
  userFlight: UserFlightEntity[];

}
