import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RunwayEntity } from "../../runways/adapters/runway.entity";


@Entity("located")
export class LocatedEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "double precision", nullable: false })
    longitude: number;

    @Column({ type: "double precision", nullable: false })
    latitude: number;

    @Column({ type: "varchar", nullable: false })
    name: string;

    @OneToMany(() => RunwayEntity, (runway) => runway.location)
    runways: RunwayEntity[];


}