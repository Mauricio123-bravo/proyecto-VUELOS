import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { FlightEntity } from "../../flights/adapters/flight.entity";


@Entity("located")
export class LocatedEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "double precision" ,nullable: false })
    longitude: number;
    
    @Column({ type: "double precision",  nullable: false })
    latitude: number;

    @Column({ type: "varchar",  nullable: false })
    name: string;

    @OneToMany(() => FlightEntity, (flight) => flight.origin)
    flightsOrigin : FlightEntity[]; 

   
    @OneToMany(() => FlightEntity, (flight) => flight.destination)
    flightsDestination: FlightEntity[]; 


}