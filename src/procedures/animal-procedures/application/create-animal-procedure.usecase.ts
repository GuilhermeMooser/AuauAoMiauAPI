import type { MedicineProcedureRepository } from '@/procedures/medicine-procedure/domain/medicine-procedure.repository';
import type { MiscellaneousProcedureRepository } from '@/procedures/miscellaneous-procedure/domain/miscellaneous-procedure.repository';
import type { SurgeryProcedureRepository } from '@/procedures/surgery-procedure/domain/surgery-procedure.repository';
import type { VaccineProcedureRepository } from '@/procedures/vaccine-procedure/domain/vaccine-procedure.repository';
import { UseCase } from '@/shared/application/usecases/use-case';
import { Inject, Injectable } from '@nestjs/common';
import { AnimalProcedureEnum } from '../infrastructure/animal-procedures.schema';
import { CreateMedicineProcedureDto } from '@/procedures/medicine-procedure/infrastructure/dto/create-medicine-procedure.dto';
import { CreateSurgeryProcedureDto } from '@/procedures/surgery-procedure/infrastructure/dto/create-surgery-procedure.dto';
import { CreateVaccineProcedureDto } from '@/procedures/vaccine-procedure/infrastructure/dto/create-vaccine-procedure.dto';
import { CreateMiscellaneousProcedureDto } from '@/procedures/miscellaneous-procedure/infrastructure/dto/create-miscellaneous-procedure.dto';
import { Animal } from '@/animals/domain/animal.entity';
import { CreateExpenseDto } from '@/expenses/infrastructure/dto/create-expenses.dto';
import { CreateMedicineProcedureUseCase } from '@/procedures/medicine-procedure/application/create-medicine-procedure.usecase';

type Input = {
  dto: {
    procedureType: AnimalProcedureEnum;
    dtOfProcedure?: Date;
    description: string;
    veterinarian?: string;
    observation?: string;
    expenses?: CreateExpenseDto[];
    payload:
      | CreateMedicineProcedureDto
      | CreateSurgeryProcedureDto
      | CreateVaccineProcedureDto
      | CreateMiscellaneousProcedureDto;
  };
  animal: Animal;
};

type Output = void;

@Injectable()
export class CreateAnimalProcedureUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('MedicineProcedureRepository')
    private readonly medicineProcedureRepository: MedicineProcedureRepository,
    @Inject('MiscellaneousProcedureRepository')
    private readonly miscellaneousProcedureRepository: MiscellaneousProcedureRepository,
    @Inject('SurgeryProcedureRepository')
    private readonly surgeryProcedureRepository: SurgeryProcedureRepository,
    @Inject('VaccineProcedureRepository')
    private readonly vaccineProcedureRepository: VaccineProcedureRepository,
    private readonly createMedicineProcedureUseCase: CreateMedicineProcedureUseCase,
  ) {}

  async execute({ dto, animal }: Input): Promise<Output> {
    switch (dto.procedureType) {
      case AnimalProcedureEnum.MEDICINE:
        // await this.createMedicineProcedure(dto.payload as CreateMedicineProcedureDto, animal);
        await this.createMedicineProcedureUseCase.execute({
          animal,
          ...dto,
          payload: dto.payload as CreateMedicineProcedureDto,
        });

        break;

      case AnimalProcedureEnum.MISCELLANEOUS:
        await this.createMiscellaneousProcedure(
          dto.payload as CreateMiscellaneousProcedureDto,
          animal,
        );
        break;

      case AnimalProcedureEnum.SURGERY:
        await this.createSurgeryProcedure(
          dto.payload as CreateSurgeryProcedureDto,
          animal,
        );
        break;

      case AnimalProcedureEnum.VACCINE:
        await this.createVaccineProcedure(
          dto.payload as CreateVaccineProcedureDto,
          animal,
        );
        break;
    }
  }

  private async createMedicineProcedure(
    payload: CreateMedicineProcedureDto,
    animal: Animal,
  ) {}
  private async createMiscellaneousProcedure(
    payload: CreateMiscellaneousProcedureDto,
    animal: Animal,
  ) {}
  private async createSurgeryProcedure(
    payload: CreateSurgeryProcedureDto,
    animal: Animal,
  ) {}
  private async createVaccineProcedure(
    payload: CreateVaccineProcedureDto,
    animal: Animal,
  ) {}
}
//TALVEZ AQUI CRIAR UM SERVICE PARA CADA UM
