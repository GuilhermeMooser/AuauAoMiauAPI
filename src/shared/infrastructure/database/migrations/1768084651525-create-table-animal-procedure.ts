import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableAnimalProcedure1768084651525 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'animal_procedure',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'animal_id',
            type: 'uuid',
          },
          {
            name: 'procedure_type',
            type: 'animal_procedure_enum',
          },
          {
            name: 'dtOfProcedure',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'varchar',
            length: '400',
          },
          {
            name: 'veterinarian',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'observation',
            type: 'varchar',
            isNullable: true,
            length: '255',
          },
          //Audit
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'deletedAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'createdByUserId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'updatedByUserId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'deletedByUserId',
            type: 'uuid',
            isNullable: true,
          },
        ]
      }),
      true
    );

    await queryRunner.createForeignKey(
      'animal_procedure',
      new TableForeignKey({
        columnNames: ['animal_id'],
        referencedTableName: 'animal',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
