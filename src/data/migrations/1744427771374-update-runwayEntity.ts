import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRunwayEntity1744427771374 implements MigrationInterface {
    name = 'UpdateRunwayEntity1744427771374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "runway" ADD "width" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "runway" DROP COLUMN "length"`);
        await queryRunner.query(`ALTER TABLE "runway" ADD "length" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "runway" DROP COLUMN "length"`);
        await queryRunner.query(`ALTER TABLE "runway" ADD "length" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "runway" DROP COLUMN "width"`);
    }

}
