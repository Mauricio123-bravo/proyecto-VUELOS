import { MigrationInterface, QueryRunner } from "typeorm";

export class CREATETABLESENTITIESMODULES1740353775595 implements MigrationInterface {
    name = 'CREATETABLESENTITIESMODULES1740353775595'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying(120) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
    }

}
