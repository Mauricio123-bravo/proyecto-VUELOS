import { MigrationInterface, QueryRunner } from "typeorm";

export class SessionLength1741103892332 implements MigrationInterface {
    name = 'SessionLength1741103892332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "ipAddress"`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "ipAddress" character varying(50) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "ipAddress"`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "ipAddress" character varying(15) NOT NULL`);
    }

}
