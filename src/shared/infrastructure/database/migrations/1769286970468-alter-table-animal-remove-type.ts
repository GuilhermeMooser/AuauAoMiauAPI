import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableAnimalRemoveType1769286970468 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn(
        'animal',
        'type',
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
