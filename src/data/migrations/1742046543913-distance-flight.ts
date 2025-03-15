import { MigrationInterface, QueryRunner } from "typeorm";

export class DistanceFlight1742046543913 implements MigrationInterface {
    name = 'DistanceFlight1742046543913'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flights" ADD "distance" double precision`);
        await queryRunner.query(`ALTER TABLE "airplanes" ADD "name" character varying(80)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flights" DROP COLUMN "distance"`);
        await queryRunner.query(`ALTER TABLE "airplanes" DROP COLUMN "name"`);
    }

}
