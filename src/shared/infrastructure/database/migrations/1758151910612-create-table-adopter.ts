import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableAdopter1758151910612 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'adopter',
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
          },
          {
            name: 'dtOfBirth',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'rg',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'cpf',
            type: 'varchar',
            isUnique: true,
            length: '14',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'profession',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'civilState',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'activeNotification',
            type: 'boolean',
            default: true,
          },
          {
            name: 'dtToNotify',
            type: 'timestamp',
            isNullable: true,
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
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

