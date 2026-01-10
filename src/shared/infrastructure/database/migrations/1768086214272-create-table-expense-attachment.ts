import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableExpenseAttachment1768086214272 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'expense_attachment',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          { name: 'expense_id', type: 'uuid' },
          { name: 'fileType', type: 'varchar' },
          { name: 'filePath', type: 'varchar' },
          { name: 'name', type: 'varchar' },
          { name: 'fileSize', type: 'varchar', isNullable: true },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ]
      }),
      true
    );

    await queryRunner.createForeignKey(
      'expense_attachment',
      new TableForeignKey({
        columnNames: ['expense_id'],
        referencedTableName: 'expenses',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
