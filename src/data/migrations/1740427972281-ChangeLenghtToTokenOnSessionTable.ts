import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeLenghtToTokenOnSessionTable1740427972281 implements MigrationInterface {
    name = 'ChangeLenghtToTokenOnSessionTable1740427972281'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "token"`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "token" character varying(300) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "token"`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "token" character varying(100) NOT NULL`);
    }

}
