import { MigrationInterface, QueryRunner } from "typeorm";

export class UserFlightsUiid1741402393802 implements MigrationInterface {
    name = 'UserFlightsUiid1741402393802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userFlights" DROP CONSTRAINT "PK_7396b1d0608d5ab5793b127f4b6"`);
        await queryRunner.query(`ALTER TABLE "userFlights" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "userFlights" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "userFlights" ADD CONSTRAINT "PK_7396b1d0608d5ab5793b127f4b6" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userFlights" DROP CONSTRAINT "PK_7396b1d0608d5ab5793b127f4b6"`);
        await queryRunner.query(`ALTER TABLE "userFlights" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "userFlights" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "userFlights" ADD CONSTRAINT "PK_7396b1d0608d5ab5793b127f4b6" PRIMARY KEY ("id")`);
    }

}
