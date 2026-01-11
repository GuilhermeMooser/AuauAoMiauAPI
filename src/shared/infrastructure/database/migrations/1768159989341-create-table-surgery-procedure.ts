import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableSurgeryProcedure1768159989341 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'surgery_procedure',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'surgeryName', type: 'varchar' },
          { name: 'surgeryType', type: 'varchar', isNullable: true },
          { name: 'local', type: 'varchar', isNullable: true },
          { name: 'reason', type: 'varchar', length: '600' },
          { name: 'dtOfDuration', type: 'timestamp', isNullable: true },
          { name: 'recomendations', type: 'varchar', isNullable: true, length: '600' },
        ]
      }),
      true
    );

    await queryRunner.createForeignKey(
      'surgery_procedure',
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
