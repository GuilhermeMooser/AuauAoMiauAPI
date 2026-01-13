import { MigrationInterface, QueryRunner } from "typeorm";

export class SeederToUserRoleType1768261517743 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.query(`
        INSERT INTO user_role (name)
        VALUES ('Administrador'), ('Voluntário')
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
