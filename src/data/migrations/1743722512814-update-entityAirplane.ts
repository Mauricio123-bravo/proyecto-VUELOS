import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEntityAirplane1743722512814 implements MigrationInterface {
    name = 'UpdateEntityAirplane1743722512814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "airplanes" DROP COLUMN "modelYear"`);
        await queryRunner.query(`ALTER TABLE "airplanes" ADD "modelYear" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "airplanes" DROP COLUMN "modelYear"`);
        await queryRunner.query(`ALTER TABLE "airplanes" ADD "modelYear" character varying(100) NOT NULL`);
    }

}
