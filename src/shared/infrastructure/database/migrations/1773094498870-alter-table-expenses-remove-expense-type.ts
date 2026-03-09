import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableExpensesRemoveExpenseType1773094498870 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn("expenses", "expenseType");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
