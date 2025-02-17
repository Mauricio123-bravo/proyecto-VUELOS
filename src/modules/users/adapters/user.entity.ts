import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity("users")
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100, nullable: false })
    username: string;
    
    @Column({ type: "varchar", length: 100, nullable: false })
    password: string;

   
}