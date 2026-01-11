import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableAnimalAddCastratedField1768161418028 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'animal',
        new TableColumn({
          name: 'castrated',
          type: 'boolean',
          isNullable: true,
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
