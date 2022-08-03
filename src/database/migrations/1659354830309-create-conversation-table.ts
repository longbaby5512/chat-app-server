import { MigrationInterface, QueryRunner } from 'typeorm';

export class createConversationTable1659354830309
  implements MigrationInterface
{
  name = 'createConversationTable1659354830309';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "conversations" (
                "id" SERIAL NOT NULL,
                "user_id" integer NOT NULL,
                "to_user_id" integer NOT NULL,
                "content" character varying NOT NULL,
                "type" character varying NOT NULL DEFAULT 'text',
                "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_ee34f4f7ced4ec8681f26bf04ef" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "conversations"
        `);
  }
}
