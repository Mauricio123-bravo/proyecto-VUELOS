import { MigrationInterface, QueryRunner } from "typeorm";

export class Runways1741802906766 implements MigrationInterface {
    name = 'Runways1741802906766'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "runway" ("id" SERIAL NOT NULL, "length" character varying(100) NOT NULL, "status" boolean NOT NULL, "located_id" integer, CONSTRAINT "PK_d77ca619f320ad3c04f1efdbd5d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "runway" ADD CONSTRAINT "FK_d1ba902b6ec9156c608c88f9ee1" FOREIGN KEY ("located_id") REFERENCES "located"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flights" ADD CONSTRAINT "FK_7406b1d87f86721c608c7605faf" FOREIGN KEY ("origin_id") REFERENCES "runway"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flights" ADD CONSTRAINT "FK_23ac3c38d3557b49013de888bec" FOREIGN KEY ("destination_id") REFERENCES "runway"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flights" DROP CONSTRAINT "FK_23ac3c38d3557b49013de888bec"`);
        await queryRunner.query(`ALTER TABLE "flights" DROP CONSTRAINT "FK_7406b1d87f86721c608c7605faf"`);
        await queryRunner.query(`ALTER TABLE "runway" DROP CONSTRAINT "FK_d1ba902b6ec9156c608c88f9ee1"`);
        await queryRunner.query(`DROP TABLE "runway"`);
    }

}
