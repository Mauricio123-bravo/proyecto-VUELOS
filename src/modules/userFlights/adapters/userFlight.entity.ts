import { Entity, JoinColumn, ManyToOne, Column, PrimaryGeneratedColumn } from "typeorm";
import { FlightEntity } from "../../flights/adapters/flight.entity";
import { UserEntity } from "../../users/adapters/user.entity";

@Entity("userFlights")
export class UserFlightEntity {

  @PrimaryGeneratedColumn("uuid") 
  id: string;

  @ManyToOne(() => FlightEntity, (flight) => flight.userFlight)
  @JoinColumn({ name: "flight_id" })
  flight: FlightEntity;

  @ManyToOne(() => UserEntity, (user) => user.userFlight)
  @JoinColumn({ name: "user_id" })
  user: UserEntity; 

  @Column({ type: "int", nullable: false })
  numberOfSeats: number;
}
