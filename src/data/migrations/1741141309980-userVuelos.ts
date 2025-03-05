import { MigrationInterface, QueryRunner } from "typeorm";

export class UserVuelos1741141309980 implements MigrationInterface {
    name = 'UserVuelos1741141309980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "userFlights" ("id" SERIAL NOT NULL, "numberOfSeats" integer NOT NULL, "flight_id" integer, "user_id" integer, CONSTRAINT "PK_7396b1d0608d5ab5793b127f4b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "userFlights" ADD CONSTRAINT "FK_feffb4b31b5dbf5142642eb761d" FOREIGN KEY ("flight_id") REFERENCES "flights"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "userFlights" ADD CONSTRAINT "FK_b1c75107bf36218ddc8ef842134" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userFlights" DROP CONSTRAINT "FK_b1c75107bf36218ddc8ef842134"`);
        await queryRunner.query(`ALTER TABLE "userFlights" DROP CONSTRAINT "FK_feffb4b31b5dbf5142642eb761d"`);
        await queryRunner.query(`DROP TABLE "userFlights"`);
    }

}
