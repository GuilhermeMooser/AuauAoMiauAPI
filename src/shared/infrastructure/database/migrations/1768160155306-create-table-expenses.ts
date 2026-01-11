import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableExpenses1768160155306 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'expenses',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          { name: 'animal_id', type: 'uuid' },
          { name: 'animal_procedure_id', type: 'uuid', isNullable: true },
          { name: 'expenseType', type: 'varchar' },
          { name: 'value', type: 'decimal', precision: 10, scale: 2 },
          { name: 'description', type: 'varchar', length: '400' },
          { name: 'paymentType', type: 'varchar', isNullable: true },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ]
      }),
      true
    );

    await queryRunner.createForeignKeys('expenses', [
      new TableForeignKey({
        columnNames: ['animal_id'],
        referencedTableName: 'animal',
        referencedColumnNames: ['id'],
      }),
      new TableForeignKey({
        columnNames: ['animal_procedure_id'],
        referencedTableName: 'animal_procedure',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
