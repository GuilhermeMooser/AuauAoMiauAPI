import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableAdopterRgOptional1774055640258
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'adopter',
      'rg',
      new TableColumn({
        name: 'rg',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
