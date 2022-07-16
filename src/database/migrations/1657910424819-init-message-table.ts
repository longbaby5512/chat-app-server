import { MigrationInterface, QueryRunner } from 'typeorm';

export class initMessageTable1657910424819 implements MigrationInterface {
  name = 'initMessageTable1657910424819';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "messages" (
                "id" SERIAL NOT NULL,
                "from" integer NOT NULL,
                "to" integer NOT NULL,
                "content" character varying NOT NULL,
                "type" character varying NOT NULL DEFAULT 'text',
                "timestamp" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_671851391885ee9558647e68fd" ON "messages" ("from")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_55c3fda49d1144a59a90975308" ON "messages" ("to")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX "public"."IDX_55c3fda49d1144a59a90975308"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_671851391885ee9558647e68fd"
        `);
    await queryRunner.query(`
            DROP TABLE "messages"
        `);
  }
}
