import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { FlightEntity } from "../../flights/adapters/flight.entity";


@Entity("located")
export class LocatedEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "timestamp" ,nullable: false })
    longitude: number;
    
    @Column({ type: "timestamp",  nullable: false })
    latitude: number;

    @OneToMany(() => FlightEntity, (flight) => flight.origin)
    flightsOrigin : FlightEntity[]; 

   
    @OneToMany(() => FlightEntity, (flight) => flight.destination)
    flightsDestination: FlightEntity[]; 


}