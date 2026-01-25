// import {
//   AnimalProcedures,
//   AnimalProceduresProps,
// } from '@/procedures/animal-procedures/domain/animal-procedures.entity';
// import { Audit } from '@/shared/domain/entity';

// type MedicineProcedureProps = AnimalProceduresProps & {
//   medicineName: string;
//   reason: string;
//   dosage?: string;
//   frequency?: string;
//   dtOfStart: Date;
//   dtOfEnd?: Date;
// };

// export class MedicineProcedure extends AnimalProcedures {
//   constructor(
//     props: MedicineProcedureProps & {
//       id?: string;
//       audit?: Partial<Audit>;
//       createdByUserId?: string;
//       updatedByUserId?: string;
//       deletedByUserId?: string;
//     },
//   ) {
//     super(props);
//   }

//   static create(
//     props: MedicineProcedureProps & {
//       createdByUserId?: string;
//     },
//   ) {
//     return new MedicineProcedure({
//       ...props,
//       audit: {
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         deletedAt: null,
//       },
//       createdByUserId: props.createdByUserId,
//     });
//   }
// }
