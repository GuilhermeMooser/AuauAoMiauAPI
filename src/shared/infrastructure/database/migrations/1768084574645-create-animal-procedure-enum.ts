import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAnimalProcedureEnum1768084574645 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        CREATE TYPE animal_procedure_enum AS ENUM (
          'VACCINE',
          'MEDICINE',
          'SURGERY',
          'MISCELLANEOUS'
        )
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
