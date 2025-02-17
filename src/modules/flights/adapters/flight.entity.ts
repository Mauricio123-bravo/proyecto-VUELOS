import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AirplaneEntity } from "../../airplanes/adapters/airplane.entity";
import { PilotEntity } from "../../pilots/adapters/pilot.entity";
import { TrackEntity } from "../../tracks/adapters/track.entity";
import { FlightHistoryEntity } from "../../flightshistory/adapters/flightHistory.entity";
import { LocatedEntity } from "../../located/adapters/located.entity";
import { Located } from "../../located/models/located.model";

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

  @OneToOne(() => FlightHistoryEntity, (flightHistory) => flightHistory.flight)
  flightHistory: FlightHistoryEntity;


  @ManyToOne(() => LocatedEntity, (located) => located.flightsOrigin)
  @JoinColumn({ name: "origin_id" })
  origin: LocatedEntity;


  @ManyToOne(() => LocatedEntity, (located) => located.flightsDestination)
  @JoinColumn({ name: "destination_id" })
  destination: LocatedEntity;
  
}
