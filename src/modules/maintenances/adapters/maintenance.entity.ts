
import { Column, Entity, JoinColumn, ManyToOne,PrimaryGeneratedColumn } from "typeorm";
import { AirplaneEntity } from "../../airplanes/adapters/airplane.entity";
import { Airplane } from "../../airplanes/models/airplane.model";

@Entity("maintenances")
export class MaintenanceEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "timestamp",  nullable: false })
    date: Date;
    
    @Column({ type: "varchar", length: 1000, nullable: false })
    description: string;

    @Column({ type: "boolean", nullable: false })
    status: boolean;

    @ManyToOne(() => AirplaneEntity, (airplane) => airplane.maintenances, {onDelete:"CASCADE"})
    @JoinColumn({name:"airplane_id"})
    airplane: AirplaneEntity; 

}