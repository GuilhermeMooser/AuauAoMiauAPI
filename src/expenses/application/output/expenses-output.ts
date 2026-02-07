// import { Expenses } from "@/expenses/domain/expenses.entity";
// import { OutputMapper } from "@/shared/application/outputs/output-mapper";
// import { Injectable } from "@nestjs/common";

// export type ExpensesOutput = {
//   expenseType: string;
//   value: number;
//   description: string;
//   paymentType: string;
//   animal: Animal;
// }

// @Injectable()
// export class ExpensesOutputMapper extends OutputMapper<Expenses, ExpensesOutput> {

//   toOutput(entity: Expenses): ExpensesOutput {
//     throw new Error("Method not implemented.");
//   }

// }

// //FAZER UM MINIMAL EXPENSE OUTPUT PQ NAO PRECISO CUSPIR ESSE ANIMAL JUNTO
// // OU EU POSSO MOCKAR AS ANIMAL
// //PRA FAZER A PARADA DO ANIMAL_PROCEDURE_OUTPUT