import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Airplane } from "../../airplanes/models/airplane.model";

@Entity("flights")
export class FlightEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  origin: string; 

  @Column({ type: "varchar", length: 100, nullable: false })
  destination: string; 

  @Column({ type: "date", nullable: false })
  departureDate: Date; 

  @Column({ type: "date", nullable: false })
  arrivalDate: Date; 

  @Column({ type: "boolean", nullable: false })
  status: boolean; 

  @ManyToOne(() => Airplane, (airplane) => airplane.flights)
  @JoinColumn({ name: "airplane_id" }) 
  airplane: Airplane; 
}
