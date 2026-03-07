import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAnimalTypeIntoAnimalTypeTable1772842195700 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        INSERT INTO animal_type (type)
        VALUES ('OUTRO')
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
