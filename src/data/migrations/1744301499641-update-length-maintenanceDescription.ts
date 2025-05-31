import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateLengthMaintenanceDescription1744301499641 implements MigrationInterface {
    name = 'UpdateLengthMaintenanceDescription1744301499641'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "maintenances" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "maintenances" ADD "description" character varying(1000) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "maintenances" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "maintenances" ADD "description" character varying(800) NOT NULL`);
    }

}
