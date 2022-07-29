import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeSaltColumn1658536546720 implements MigrationInterface {
  name = 'removeSaltColumn1658536546720';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "salt"
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "salt" text
        `);
  }
}
