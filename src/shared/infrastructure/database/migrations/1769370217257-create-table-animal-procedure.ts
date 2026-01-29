import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableAnimalProcedure1769370217257
  implements MigrationInterface
{
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
          //Daughters
          {
            name: 'medicineName',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'reason',
            type: 'varchar',
            length: '400',
            isNullable: true,
          },
          {
            name: 'dosage',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'frequency',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'dtOfStart',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'dtOfEnd',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'recomendations',
            type: 'varchar',
            isNullable: true,
            length: '600',
          },
          {
            name: 'surgeryName',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'surgeryType',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'local',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'dtOfDuration',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'vaccineName',
            type: 'varchar',
            isNullable: true,
            length: '300',
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
        ],
      }),
      true,
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

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
