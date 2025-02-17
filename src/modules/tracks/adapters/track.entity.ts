import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FlightEntity } from "../../flights/adapters/flight.entity";

@Entity("tracks")
export class TrackEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100, nullable: false })
    location: string;
    
    @Column({ type: "varchar", length: 100, nullable: false })
    length: string;

    @Column({ type: "boolean", nullable: false })
    status: boolean;

    @OneToMany(() => FlightEntity, (flight) => flight.track)
      flights: FlightEntity[]; 

}