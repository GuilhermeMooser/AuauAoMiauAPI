import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableMedicineProcedure1768160110774 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'medicine_procedure',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'medicineName', type: 'varchar' },
          { name: 'reason', type: 'varchar', length: '400' },
          { name: 'dosage', type: 'varchar', isNullable: true },
          { name: 'frequency', type: 'varchar', isNullable: true },
          { name: 'dtOfStart', type: 'timestamp' },
          { name: 'dtOfEnd', type: 'timestamp', isNullable: true },
        ]
      }),
      true
    );

    await queryRunner.createForeignKey(
      'medicine_procedure',
      new TableForeignKey({
        columnNames: ['id'],
        referencedTableName: 'animal_procedure',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
