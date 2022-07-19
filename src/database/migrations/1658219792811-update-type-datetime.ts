import { MigrationInterface, QueryRunner } from "typeorm";

export class updateTypeDatetime1658219792811 implements MigrationInterface {
    name = 'updateTypeDatetime1658219792811'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "informations" DROP COLUMN "created_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "informations"
            ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "informations" DROP COLUMN "updated_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "informations"
            ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "informations" DROP COLUMN "updated_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "informations"
            ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "informations" DROP COLUMN "created_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "informations"
            ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
    }

}
