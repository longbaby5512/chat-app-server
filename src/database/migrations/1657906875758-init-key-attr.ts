import { MigrationInterface, QueryRunner } from 'typeorm';

export class initKeyAttr1657906875758 implements MigrationInterface {
  name = 'initKeyAttr1657906875758';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "key" jsonb NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "key"
        `);
  }
}
