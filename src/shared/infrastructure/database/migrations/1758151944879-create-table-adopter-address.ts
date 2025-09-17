import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableAdopterAddress1758151944879 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'adopter_address',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'street',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'number',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'neighborhood',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'adopter_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'city_id',
            type: 'int',
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

    await queryRunner.createForeignKeys('adopter_address', [
      new TableForeignKey({
        columnNames: ['adopter_id'],
        referencedTableName: 'adopter',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['city_id'],
        referencedTableName: 'city',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
