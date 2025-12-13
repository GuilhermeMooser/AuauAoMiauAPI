import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableUser1765496770599 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
            length: '150',
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
            length: '150',
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            length: '150',
          },
          {
            name: 'active',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'cpf',
            type: 'varchar',
            isNullable: false,
            length: '14',
          },
          {
            name: 'user_role_id',
            type: 'int',
            isNullable: false,
          },
          // Audit
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
    );

    await queryRunner.createForeignKeys('user', [
      new TableForeignKey({
        columnNames: ['user_role_id'],
        referencedTableName: 'user_role',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);

    // Índices parciais – únicos apenas quando deletedAt IS NULL
    await queryRunner.query(`
      CREATE UNIQUE INDEX "IDX_user_email_unique_alive"
      ON "user" ("email")
      WHERE "deletedAt" IS NULL;
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX "IDX_user_cpf_unique_alive"
      ON "user" ("cpf")
      WHERE "deletedAt" IS NULL;
    `);
  }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
