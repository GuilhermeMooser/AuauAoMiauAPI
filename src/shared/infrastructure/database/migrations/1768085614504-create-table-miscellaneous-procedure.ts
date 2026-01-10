import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableMiscellaneousProcedure1768085614504 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'miscellaneous_procedure',
          columns: [
            { name: 'id', type: 'uuid', isPrimary: true },
            { name: 'reason', type: 'varchar', length: '400' },
            { name: 'recomendations', type: 'varchar', length: '600', isNullable: true },
          ],
        }),
        true,
      );

      await queryRunner.createForeignKey(
        'miscellaneous_procedure',
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
