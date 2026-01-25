// import { UseCase } from '@/shared/application/usecases/use-case';
// import { Inject, Injectable } from '@nestjs/common';
// import type { MedicineProcedureRepository } from '../domain/medicine-procedure.repository';
// import { Animal } from '@/animals/domain/animal.entity';
// import { Expenses } from '@/expenses/domain/expenses.entity';
// import { CreateMedicineProcedureDto } from '../infrastructure/dto/create-medicine-procedure.dto';
// import { CreateExpenseDto } from '@/expenses/infrastructure/dto/create-expenses.dto';
// import { AnimalProcedureEnum } from '@/procedures/animal-procedures/infrastructure/animal-procedures.schema';
// import { ConflictError } from '@/shared/application/errors/conflict-error';
// import { MedicineProcedure } from '../domain/medicine-procedure.entity';
// import type { LoggedUserService } from '@/shared/application/user-service/logged-user';
// import type { ExpensesRepository } from '@/expenses/domain/expenses.repository';

// type Input = {
//   animal: Animal;
//   procedureType: AnimalProcedureEnum;
//   dtOfProcedure?: Date;
//   description: string;
//   veterinarian?: string;
//   observation?: string;
//   expenses?: CreateExpenseDto[];
//   payload: CreateMedicineProcedureDto;
// };

// type Output = void;

// @Injectable()
// export class CreateMedicineProcedureUseCase implements UseCase<Input, Output> {
//   constructor(
//     @Inject('MedicineProcedureRepository')
//     private readonly medicineProcedureRepository: MedicineProcedureRepository,
//     @Inject('LoggedUserService')
//     private readonly loggedUserService: LoggedUserService,
//     @Inject('ExpensesRepository')
//     private readonly expensesRepository: ExpensesRepository,
//   ) {}

//   async execute(input: Input): Promise<Output> {
//     if (!input.animal) {
//       throw new ConflictError('Animal inexistente');
//     }

//     const loggedUser = this.loggedUserService.getLoggedUser();

//     const expensesEntities: Expenses[] | undefined = input.expenses?.map(exp =>
//       Expenses.create({
//         animal: input.animal,
//         description: exp.description,
//         expenseType: exp.expenseType,
//         paymentType: exp.paymentType,
//         value: exp.value,
//         // expenseAttachment: exp.expenseAttachment,
//       }),
//     );

//     const medicineProcedure = MedicineProcedure.create({
//       // Mom
//       animal: input.animal,
//       dtOfProcedure: input.dtOfProcedure,
//       description: input.description,
//       observation: input.observation,
//       veterinarian: input.veterinarian,
//       // Daughter
//       dtOfStart: input.payload.dtOfStart,
//       medicineName: input.payload.medicineName,
//       reason: input.payload.reason,
//       createdByUserId: loggedUser.id,
//       dosage: input.payload.dosage,
//       dtOfEnd: input.payload.dtOfEnd,
//       frequency: input.payload.frequency,
//       //Expenses
//       expenses: expensesEntities,
//     });

//     await this.medicineProcedureRepository.create(medicineProcedure.toJSON());
//   }
// }
