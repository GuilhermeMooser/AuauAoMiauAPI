import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTableAdopterContact1757883383771
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'adopter_contact',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'string',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'isPrincipal',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'adopter',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKeys('adopter_contact', [
      new TableForeignKey({
        columnNames: ['adopter'],
        referencedTableName: 'adopter',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    ]);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
