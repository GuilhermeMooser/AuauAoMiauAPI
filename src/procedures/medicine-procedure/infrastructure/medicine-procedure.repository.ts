// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { MedicineProcedureSchema } from './medicine-procedure.schema';
// import { Repository } from 'typeorm';
// import { MedicineProcedureRepository } from '../domain/medicine-procedure.repository';
// import { MedicineProcedure } from '../domain/medicine-procedure.entity';

// @Injectable()
// export class MedicineProcedureRepositoryImpl
//   implements MedicineProcedureRepository
// {
//   constructor(
//     @InjectRepository(MedicineProcedureSchema)
//     private readonly medicineProcedureRepository: Repository<MedicineProcedureSchema>,
//   ) {}

//   async create(entity: MedicineProcedure): Promise<MedicineProcedure> {
//     const medicineProcedure =
//       await this.medicineProcedureRepository.save(entity);

//     return medicineProcedure;
//   }

//   async update(entity: MedicineProcedure): Promise<MedicineProcedure> {
//     const medicineProcedure =
//       await this.medicineProcedureRepository.save(entity);

//     return medicineProcedure;
//   }
// }
