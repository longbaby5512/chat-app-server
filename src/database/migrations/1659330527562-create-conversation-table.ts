import { MigrationInterface, QueryRunner } from 'typeorm';

export class createConversationTable1659330527562
  implements MigrationInterface
{
  name = 'createConversationTable1659330527562';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "conversations" (
                "id" SERIAL NOT NULL,
                "user_id" integer,
                "to_user_id" integer,
                "to_user_name" character varying,
                "content" character varying,
                "type" character varying DEFAULT 'text',
                "timestamp" TIMESTAMP WITH TIME ZONE DEFAULT now(),
                CONSTRAINT "PK_ee34f4f7ced4ec8681f26bf04ef" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "conversations"
            ADD CONSTRAINT "FK_3a9ae579e61e81cc0e989afeb4a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "conversations" DROP CONSTRAINT "FK_3a9ae579e61e81cc0e989afeb4a"
        `);
    await queryRunner.query(`
            DROP TABLE "conversations"
        `);
  }
}
