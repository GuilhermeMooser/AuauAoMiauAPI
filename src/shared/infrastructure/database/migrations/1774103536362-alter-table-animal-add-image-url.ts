import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableAnimalAddImageUrl1774103536362
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'animal',
      new TableColumn({
        name: 'imageUrl',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
