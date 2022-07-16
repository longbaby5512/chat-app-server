import { MigrationInterface, QueryRunner } from 'typeorm';

export class initUserTable1657899479654 implements MigrationInterface {
  name = 'initUserTable1657899479654';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "name" character varying(255),
                "email" character varying(255) NOT NULL,
                "password" text NOT NULL,
                "salt" text NOT NULL,
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_a3ffb1c0c8416b9fc6f907b743" ON "users" ("id")
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_a3ffb1c0c8416b9fc6f907b743"
        `);
    await queryRunner.query(`
            DROP TABLE "users"
        `);
  }
}
