import { MigrationInterface, QueryRunner } from "typeorm";

export class CREATETABLESENTITIESMODULES1739811624258 implements MigrationInterface {
    name = 'CREATETABLESENTITIESMODULES1739811624258'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "maintenances" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "description" character varying(300) NOT NULL, "status" boolean NOT NULL, "airplane_id" integer, CONSTRAINT "PK_62403473bd524a42d58589aa78b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pilots" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "licence" character varying(100) NOT NULL, "experienceYears" character varying(100) NOT NULL, "rank" character varying(100) NOT NULL, "status" boolean NOT NULL, CONSTRAINT "PK_02136c571ecc943394289942ac2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tracks" ("id" SERIAL NOT NULL, "location" character varying(100) NOT NULL, "length" character varying(100) NOT NULL, "status" boolean NOT NULL, CONSTRAINT "PK_242a37ffc7870380f0e611986e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "located" ("id" SERIAL NOT NULL, "longitude" TIMESTAMP NOT NULL, "latitude" TIMESTAMP NOT NULL, CONSTRAINT "PK_9c7dd8dae3b81a0a718d101b335" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "flightsHistory" ("id" SERIAL NOT NULL, "duration" character varying(100) NOT NULL, "observation" character varying(300) NOT NULL, "flight_id" integer, CONSTRAINT "REL_6eb43b300291403793425cbbba" UNIQUE ("flight_id"), CONSTRAINT "PK_e79485d9054f581b7f4119d97b3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "flights" DROP COLUMN "origin"`);
        await queryRunner.query(`ALTER TABLE "flights" DROP COLUMN "destination"`);
        await queryRunner.query(`ALTER TABLE "flights" ADD "pilot_id" integer`);
        await queryRunner.query(`ALTER TABLE "flights" ADD "track_id" integer`);
        await queryRunner.query(`ALTER TABLE "flights" ADD "origin_id" integer`);
        await queryRunner.query(`ALTER TABLE "flights" ADD "destination_id" integer`);
        await queryRunner.query(`ALTER TABLE "flights" DROP COLUMN "departureDate"`);
        await queryRunner.query(`ALTER TABLE "flights" ADD "departureDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "flights" DROP COLUMN "arrivalDate"`);
        await queryRunner.query(`ALTER TABLE "flights" ADD "arrivalDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "maintenances" ADD CONSTRAINT "FK_09dff8db34cad0266ef3b4416e4" FOREIGN KEY ("airplane_id") REFERENCES "airplanes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flights" ADD CONSTRAINT "FK_35c2044909499afbdfe10464a25" FOREIGN KEY ("pilot_id") REFERENCES "pilots"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flights" ADD CONSTRAINT "FK_60f1ea6e916baa9b4e484b209da" FOREIGN KEY ("track_id") REFERENCES "tracks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flights" ADD CONSTRAINT "FK_7406b1d87f86721c608c7605faf" FOREIGN KEY ("origin_id") REFERENCES "located"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flights" ADD CONSTRAINT "FK_23ac3c38d3557b49013de888bec" FOREIGN KEY ("destination_id") REFERENCES "located"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flightsHistory" ADD CONSTRAINT "FK_6eb43b300291403793425cbbbaf" FOREIGN KEY ("flight_id") REFERENCES "flights"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flightsHistory" DROP CONSTRAINT "FK_6eb43b300291403793425cbbbaf"`);
        await queryRunner.query(`ALTER TABLE "flights" DROP CONSTRAINT "FK_23ac3c38d3557b49013de888bec"`);
        await queryRunner.query(`ALTER TABLE "flights" DROP CONSTRAINT "FK_7406b1d87f86721c608c7605faf"`);
        await queryRunner.query(`ALTER TABLE "flights" DROP CONSTRAINT "FK_60f1ea6e916baa9b4e484b209da"`);
        await queryRunner.query(`ALTER TABLE "flights" DROP CONSTRAINT "FK_35c2044909499afbdfe10464a25"`);
        await queryRunner.query(`ALTER TABLE "maintenances" DROP CONSTRAINT "FK_09dff8db34cad0266ef3b4416e4"`);
        await queryRunner.query(`ALTER TABLE "flights" DROP COLUMN "arrivalDate"`);
        await queryRunner.query(`ALTER TABLE "flights" ADD "arrivalDate" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "flights" DROP COLUMN "departureDate"`);
        await queryRunner.query(`ALTER TABLE "flights" ADD "departureDate" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "flights" DROP COLUMN "destination_id"`);
        await queryRunner.query(`ALTER TABLE "flights" DROP COLUMN "origin_id"`);
        await queryRunner.query(`ALTER TABLE "flights" DROP COLUMN "track_id"`);
        await queryRunner.query(`ALTER TABLE "flights" DROP COLUMN "pilot_id"`);
        await queryRunner.query(`ALTER TABLE "flights" ADD "destination" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "flights" ADD "origin" character varying(100) NOT NULL`);
        await queryRunner.query(`DROP TABLE "flightsHistory"`);
        await queryRunner.query(`DROP TABLE "located"`);
        await queryRunner.query(`DROP TABLE "tracks"`);
        await queryRunner.query(`DROP TABLE "pilots"`);
        await queryRunner.query(`DROP TABLE "maintenances"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
