import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { FlightEntity } from "../../flights/adapters/flight.entity";
import { Flight } from "../../flights/models/flight.model";

@Entity("flightsHistory")
export class FlightHistoryEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "int", nullable: false })
    duration: number;

    @Column({ type: "varchar", length: 300, nullable: false })
    observation: string;

    @OneToOne(() => FlightEntity, (flight) => flight.flightHistory)
    @JoinColumn({ name: "flight_id" })
    flight: FlightEntity;

}