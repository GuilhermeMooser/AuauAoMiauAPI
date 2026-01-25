// import { Module } from "@nestjs/common";
// import { TypeOrmModule } from "@nestjs/typeorm";
// import { MiscellaneousProcedureSchema } from "./miscellaneous-procedure.schema";
// import { MiscellaneousProcedureRepositoryImpl } from "./miscellaneous-procedure.repository";

// @Module({
//   imports: [TypeOrmModule.forFeature([MiscellaneousProcedureSchema])],
//   providers: [
//     {
//       provide: 'MiscellaneousProcedureRepository',
//       useClass: MiscellaneousProcedureRepositoryImpl
//     }
//   ],
//   exports: ['MiscellaneousProcedureRepository']
// })
// export class MiscellaneousProcedureModule {

// }