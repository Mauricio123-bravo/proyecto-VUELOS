import { MigrationInterface, QueryRunner } from "typeorm";

export class CREATETABLEFLIGHTS1739667895431 implements MigrationInterface {
    name = 'CREATETABLEFLIGHTS1739667895431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "airplanes" ("id" SERIAL NOT NULL, "modelYear" character varying(100) NOT NULL, "capacity" character varying(100) NOT NULL, "status" boolean NOT NULL, CONSTRAINT "PK_0c49595d788fa1c9009d7dbd290" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "flights" (
            "id" SERIAL NOT NULL,
            "origin_id" integer NOT NULL,
            "destination_id" integer NOT NULL,
            "departureDate" date NOT NULL,
            "arrivalDate" date NOT NULL,
            "status" boolean NOT NULL,
            "airplane_id" integer,
            "pilot_id" integer,
            CONSTRAINT "PK_c615ef3382fdd70b6d6c2c8d8dd" PRIMARY KEY ("id")
        )`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying(101) NOT NULL, "password" character varying(100) NOT NULL, CONSTRAINT "PK_USERS" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pilots" (
            "id" SERIAL NOT NULL, 
            "name" character varying(100) NOT NULL, 
            "licence" character varying(100) NOT NULL, 
            "experienceYears" integer NOT NULL, 
            "rank" character varying(100) NOT NULL, 
            "status" boolean NOT NULL, 
            CONSTRAINT "PK_PILOTS" PRIMARY KEY ("id")
        )`);

        await queryRunner.query(`CREATE TABLE "maintenances" (
            "id" SERIAL NOT NULL, 
            "date" TIMESTAMP NOT NULL, 
            "description" character varying(300) NOT NULL, 
            "status" boolean NOT NULL, 
            "airplane_id" integer NOT NULL, 
            CONSTRAINT "PK_MAINTENANCES" PRIMARY KEY ("id"),
            CONSTRAINT "FK_MAINTENANCES_AIRPLANE" FOREIGN KEY ("airplane_id") REFERENCES "airplanes"("id") ON DELETE CASCADE
        )`);

        await queryRunner.query(`CREATE TABLE "located" (
            "id" SERIAL NOT NULL, 
            "longitude" double precision NOT NULL, 
            "latitude" double precision NOT NULL, 
            "name" character varying NOT NULL, 
            CONSTRAINT "PK_LOCATED" PRIMARY KEY ("id")
        )`);

        await queryRunner.query(`ALTER TABLE "flights" ADD CONSTRAINT "FK_10ec4f2cf1e23de40b1de9be5ec" FOREIGN KEY ("airplane_id") REFERENCES "airplanes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flights" ADD CONSTRAINT "FK_PILOT" FOREIGN KEY ("pilot_id") REFERENCES "pilots"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flights" DROP CONSTRAINT "FK_10ec4f2cf1e23de40b1de9be5ec"`);
        await queryRunner.query(`DROP TABLE "flights"`);
        await queryRunner.query(`DROP TABLE "airplanes"`);
        await queryRunner.query(`DROP TABLE "located"`);
    }

    

}
