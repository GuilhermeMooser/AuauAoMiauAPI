import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableAnimalAddAdditionalInfoField1771700235993
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'animal',
      new TableColumn({
        name: 'additionalInfo',
        type: 'varchar',
        length: '400',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
