import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEntitiesDeleteCascade1744652469758 implements MigrationInterface {
    name = 'UpdateEntitiesDeleteCascade1744652469758'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "maintenances" DROP CONSTRAINT "FK_09dff8db34cad0266ef3b4416e4"`);
        await queryRunner.query(`ALTER TABLE "runway" DROP CONSTRAINT "FK_d1ba902b6ec9156c608c88f9ee1"`);
        await queryRunner.query(`ALTER TABLE "flights" DROP CONSTRAINT "FK_10ec4f2cf1e23de40b1de9be5ec"`);
        await queryRunner.query(`ALTER TABLE "flights" DROP CONSTRAINT "FK_35c2044909499afbdfe10464a25"`);
        await queryRunner.query(`ALTER TABLE "flights" DROP CONSTRAINT "FK_7406b1d87f86721c608c7605faf"`);
        await queryRunner.query(`ALTER TABLE "flights" DROP CONSTRAINT "FK_23ac3c38d3557b49013de888bec"`);
        await queryRunner.query(`ALTER TABLE "userFlights" DROP CONSTRAINT "FK_feffb4b31b5dbf5142642eb761d"`);
        await queryRunner.query(`ALTER TABLE "userFlights" DROP CONSTRAINT "FK_b1c75107bf36218ddc8ef842134"`);
        await queryRunner.query(`ALTER TABLE "maintenances" ADD CONSTRAINT "FK_09dff8db34cad0266ef3b4416e4" FOREIGN KEY ("airplane_id") REFERENCES "airplanes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "runway" ADD CONSTRAINT "FK_d1ba902b6ec9156c608c88f9ee1" FOREIGN KEY ("located_id") REFERENCES "located"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flights" ADD CONSTRAINT "FK_10ec4f2cf1e23de40b1de9be5ec" FOREIGN KEY ("airplane_id") REFERENCES "airplanes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flights" ADD CONSTRAINT "FK_35c2044909499afbdfe10464a25" FOREIGN KEY ("pilot_id") REFERENCES "pilots"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flights" ADD CONSTRAINT "FK_7406b1d87f86721c608c7605faf" FOREIGN KEY ("origin_id") REFERENCES "runway"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flights" ADD CONSTRAINT "FK_23ac3c38d3557b49013de888bec" FOREIGN KEY ("destination_id") REFERENCES "runway"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "userFlights" ADD CONSTRAINT "FK_feffb4b31b5dbf5142642eb761d" FOREIGN KEY ("flight_id") REFERENCES "flights"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "userFlights" ADD CONSTRAINT "FK_b1c75107bf36218ddc8ef842134" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userFlights" DROP CONSTRAINT "FK_b1c75107bf36218ddc8ef842134"`);
        await queryRunner.query(`ALTER TABLE "userFlights" DROP CONSTRAINT "FK_feffb4b31b5dbf5142642eb761d"`);
        await queryRunner.query(`ALTER TABLE "flights" DROP CONSTRAINT "FK_23ac3c38d3557b49013de888bec"`);
        await queryRunner.query(`ALTER TABLE "flights" DROP CONSTRAINT "FK_7406b1d87f86721c608c7605faf"`);
        await queryRunner.query(`ALTER TABLE "flights" DROP CONSTRAINT "FK_35c2044909499afbdfe10464a25"`);
        await queryRunner.query(`ALTER TABLE "flights" DROP CONSTRAINT "FK_10ec4f2cf1e23de40b1de9be5ec"`);
        await queryRunner.query(`ALTER TABLE "runway" DROP CONSTRAINT "FK_d1ba902b6ec9156c608c88f9ee1"`);
        await queryRunner.query(`ALTER TABLE "maintenances" DROP CONSTRAINT "FK_09dff8db34cad0266ef3b4416e4"`);
        await queryRunner.query(`ALTER TABLE "userFlights" ADD CONSTRAINT "FK_b1c75107bf36218ddc8ef842134" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "userFlights" ADD CONSTRAINT "FK_feffb4b31b5dbf5142642eb761d" FOREIGN KEY ("flight_id") REFERENCES "flights"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flights" ADD CONSTRAINT "FK_23ac3c38d3557b49013de888bec" FOREIGN KEY ("destination_id") REFERENCES "runway"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flights" ADD CONSTRAINT "FK_7406b1d87f86721c608c7605faf" FOREIGN KEY ("origin_id") REFERENCES "runway"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flights" ADD CONSTRAINT "FK_35c2044909499afbdfe10464a25" FOREIGN KEY ("pilot_id") REFERENCES "pilots"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flights" ADD CONSTRAINT "FK_10ec4f2cf1e23de40b1de9be5ec" FOREIGN KEY ("airplane_id") REFERENCES "airplanes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "runway" ADD CONSTRAINT "FK_d1ba902b6ec9156c608c88f9ee1" FOREIGN KEY ("located_id") REFERENCES "located"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "maintenances" ADD CONSTRAINT "FK_09dff8db34cad0266ef3b4416e4" FOREIGN KEY ("airplane_id") REFERENCES "airplanes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
