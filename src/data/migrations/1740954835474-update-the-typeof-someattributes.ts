import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTheTypeofSomeattributes1740954835474 implements MigrationInterface {
    name = 'UpdateTheTypeofSomeattributes1740954835474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "airplanes" DROP COLUMN "capacity"`);
        await queryRunner.query(`ALTER TABLE "airplanes" ADD "capacity" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pilots" DROP COLUMN "experienceYears"`);
        await queryRunner.query(`ALTER TABLE "pilots" ADD "experienceYears" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pilots" DROP COLUMN "experienceYears"`);
        await queryRunner.query(`ALTER TABLE "pilots" ADD "experienceYears" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "airplanes" DROP COLUMN "capacity"`);
        await queryRunner.query(`ALTER TABLE "airplanes" ADD "capacity" character varying(100) NOT NULL`);
    }

}
