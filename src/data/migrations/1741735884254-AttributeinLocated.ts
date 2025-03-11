import { MigrationInterface, QueryRunner } from "typeorm";

export class AttributeinLocated1741735884254 implements MigrationInterface {
    name = 'AttributeinLocated1741735884254'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "located" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "located" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "located" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "located" ADD "name" double precision NOT NULL`);
    }

}
