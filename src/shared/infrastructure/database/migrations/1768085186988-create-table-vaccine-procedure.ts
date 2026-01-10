import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableVaccineProcedure1768085186988 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vaccine_procedure',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'vaccineName',
            type: 'varchar',
          },
          {
            name: 'vaccineType',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'batch',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'manufacturer',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'dtOfExpiration',
            type: 'timestamp',
            isNullable: true,
          },
        ]
      }),
      true
    );

    await queryRunner.createForeignKey(
      'vaccine_procedure',
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
