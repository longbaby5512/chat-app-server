import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeCascade1658417732891 implements MigrationInterface {
  name = 'changeCascade1658417732891';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "informations" DROP CONSTRAINT "FK_5b7c03296b7da9206b6c7b054e1"
        `);
    await queryRunner.query(`
            ALTER TABLE "informations"
            ADD CONSTRAINT "FK_5b7c03296b7da9206b6c7b054e1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "informations" DROP CONSTRAINT "FK_5b7c03296b7da9206b6c7b054e1"
        `);
    await queryRunner.query(`
            ALTER TABLE "informations"
            ADD CONSTRAINT "FK_5b7c03296b7da9206b6c7b054e1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }
}
