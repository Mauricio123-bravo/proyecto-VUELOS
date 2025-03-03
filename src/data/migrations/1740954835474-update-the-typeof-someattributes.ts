import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTheTypeofSomeattributes1740954835474 implements MigrationInterface {
    name = 'UpdateTheTypeofSomeattributes1740954835474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "airplanes" DROP COLUMN "capacity"`);
        await queryRunner.query(`ALTER TABLE "airplanes" ADD "capacity" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pilots" DROP COLUMN "experienceYears"`);
        await queryRunner.query(`ALTER TABLE "pilots" ADD "experienceYears" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "flightsHistory" DROP COLUMN "duration"`);
        await queryRunner.query(`ALTER TABLE "flightsHistory" ADD "duration" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "located" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "located" ADD "longitude" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "located" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "located" ADD "latitude" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "located" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "located" ADD "latitude" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "located" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "located" ADD "longitude" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "flightsHistory" DROP COLUMN "duration"`);
        await queryRunner.query(`ALTER TABLE "flightsHistory" ADD "duration" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pilots" DROP COLUMN "experienceYears"`);
        await queryRunner.query(`ALTER TABLE "pilots" ADD "experienceYears" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "airplanes" DROP COLUMN "capacity"`);
        await queryRunner.query(`ALTER TABLE "airplanes" ADD "capacity" character varying(100) NOT NULL`);
    }

}
