import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableAnimalType1768161236801 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'animal_type',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'type', type: 'varchar', length: '100', isUnique: true, },
        ]
      })
    )

    await queryRunner.query(`
      INSERT INTO animal_type (type)
      VALUES ('CACHORRO'), ('GATO')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
