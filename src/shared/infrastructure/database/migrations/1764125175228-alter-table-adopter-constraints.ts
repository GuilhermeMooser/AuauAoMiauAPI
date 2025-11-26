import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * That was necessary because the update method retrieves deleted entities before validating the update action
 */

export class AlterTableAdopterConstraints1764125175228
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "adopter" DROP CONSTRAINT IF EXISTS "UQ_1c700505a44f69446251532c87d";
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX "IDX_adopter_email_unique_alive"
      ON "adopter" ("email")
      WHERE "deletedAt" IS NULL;
    `);

    await queryRunner.query(`
      ALTER TABLE "adopter" DROP CONSTRAINT IF EXISTS "UQ_5b3b179449c0f1af997531b0802";
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX "IDX_adopter_cpf_unique_alive"
      ON "adopter" ("cpf")
      WHERE "deletedAt" IS NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
