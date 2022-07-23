import { MigrationInterface, QueryRunner } from 'typeorm';

export class createRefreshTokenModule1658504807760
  implements MigrationInterface
{
  name = 'createRefreshTokenModule1658504807760';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "refresh_token" text
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "password" DROP NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "salt" DROP NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "salt"
            SET NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "password"
            SET NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "refresh_token"
        `);
  }
}
