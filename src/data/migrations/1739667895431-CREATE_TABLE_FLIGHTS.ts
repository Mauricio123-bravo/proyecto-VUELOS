import { MigrationInterface, QueryRunner } from "typeorm";

export class CREATETABLEFLIGHTS1739667895431 implements MigrationInterface {
    name = 'CREATETABLEFLIGHTS1739667895431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "airplanes" ("id" SERIAL NOT NULL, "modelYear" character varying(100) NOT NULL, "capacity" character varying(100) NOT NULL, "status" boolean NOT NULL, CONSTRAINT "PK_0c49595d788fa1c9009d7dbd290" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "flights" ("id" SERIAL NOT NULL, "origin" character varying(100) NOT NULL, "destination" character varying(100) NOT NULL, "departureDate" date NOT NULL, "arrivalDate" date NOT NULL, "status" boolean NOT NULL, "airplane_id" integer, CONSTRAINT "PK_c614ef3382fdd70b6d6c2c8d8dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "flights" ADD CONSTRAINT "FK_10ec4f2cf1e23de40b1de9be5ec" FOREIGN KEY ("airplane_id") REFERENCES "airplanes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flights" DROP CONSTRAINT "FK_10ec4f2cf1e23de40b1de9be5ec"`);
        await queryRunner.query(`DROP TABLE "flights"`);
        await queryRunner.query(`DROP TABLE "airplanes"`);
    }

    

}
