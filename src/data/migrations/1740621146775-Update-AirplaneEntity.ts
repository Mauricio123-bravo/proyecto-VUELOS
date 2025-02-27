import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAirplaneEntity1740621146775 implements MigrationInterface {
    name = 'UpdateAirplaneEntity1740621146775'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "maintenances" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "description" character varying(300) NOT NULL, "status" boolean NOT NULL, "airplane_id" integer, CONSTRAINT "PK_62403473bd524a42d58589aa78b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "airplanes" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "modelYear" character varying(100) NOT NULL, "capacity" character varying(100) NOT NULL, "status" boolean NOT NULL, CONSTRAINT "PK_0c49595d788fa1c9009d7dbd290" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "flightsHistory" ("id" SERIAL NOT NULL, "duration" character varying(100) NOT NULL, "observation" character varying(300) NOT NULL, "flight_id" integer, CONSTRAINT "REL_6eb43b300291403793425cbbba" UNIQUE ("flight_id"), CONSTRAINT "PK_e79485d9054f581b7f4119d97b3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "flights" ("id" SERIAL NOT NULL, "departureDate" TIMESTAMP NOT NULL, "arrivalDate" TIMESTAMP NOT NULL, "status" boolean NOT NULL, "airplane_id" integer, "pilot_id" integer, "track_id" integer, "origin_id" integer, "destination_id" integer, CONSTRAINT "PK_c614ef3382fdd70b6d6c2c8d8dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "maintenances" ADD CONSTRAINT "FK_09dff8db34cad0266ef3b4416e4" FOREIGN KEY ("airplane_id") REFERENCES "airplanes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flightsHistory" ADD CONSTRAINT "FK_6eb43b300291403793425cbbbaf" FOREIGN KEY ("flight_id") REFERENCES "flights"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flights" ADD CONSTRAINT "FK_10ec4f2cf1e23de40b1de9be5ec" FOREIGN KEY ("airplane_id") REFERENCES "airplanes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flights" ADD CONSTRAINT "FK_35c2044909499afbdfe10464a25" FOREIGN KEY ("pilot_id") REFERENCES "pilots"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flights" ADD CONSTRAINT "FK_60f1ea6e916baa9b4e484b209da" FOREIGN KEY ("track_id") REFERENCES "tracks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flights" ADD CONSTRAINT "FK_7406b1d87f86721c608c7605faf" FOREIGN KEY ("origin_id") REFERENCES "located"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flights" ADD CONSTRAINT "FK_23ac3c38d3557b49013de888bec" FOREIGN KEY ("destination_id") REFERENCES "located"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flights" DROP CONSTRAINT "FK_23ac3c38d3557b49013de888bec"`);
        await queryRunner.query(`ALTER TABLE "flights" DROP CONSTRAINT "FK_7406b1d87f86721c608c7605faf"`);
        await queryRunner.query(`ALTER TABLE "flights" DROP CONSTRAINT "FK_60f1ea6e916baa9b4e484b209da"`);
        await queryRunner.query(`ALTER TABLE "flights" DROP CONSTRAINT "FK_35c2044909499afbdfe10464a25"`);
        await queryRunner.query(`ALTER TABLE "flights" DROP CONSTRAINT "FK_10ec4f2cf1e23de40b1de9be5ec"`);
        await queryRunner.query(`ALTER TABLE "flightsHistory" DROP CONSTRAINT "FK_6eb43b300291403793425cbbbaf"`);
        await queryRunner.query(`ALTER TABLE "maintenances" DROP CONSTRAINT "FK_09dff8db34cad0266ef3b4416e4"`);
        await queryRunner.query(`DROP TABLE "flights"`);
        await queryRunner.query(`DROP TABLE "flightsHistory"`);
        await queryRunner.query(`DROP TABLE "airplanes"`);
        await queryRunner.query(`DROP TABLE "maintenances"`);
    }

}
