import { MigrationInterface, QueryRunner } from "typeorm";

export class changeKeyToNullable1658416567625 implements MigrationInterface {
    name = 'changeKeyToNullable1658416567625'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "key" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "messages" DROP COLUMN "timestamp"
        `);
        await queryRunner.query(`
            ALTER TABLE "messages"
            ADD "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "messages" DROP COLUMN "timestamp"
        `);
        await queryRunner.query(`
            ALTER TABLE "messages"
            ADD "timestamp" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "key"
            SET NOT NULL
        `);
    }

}
