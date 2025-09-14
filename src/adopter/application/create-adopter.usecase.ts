import { AdopterContact } from '@/adopter-contacts/domain/adopter-contact.entity';
import { ConflictError } from '@/shared/application/errors/conflict-error';
import { UseCase } from '@/shared/application/usecases/use-case';
import { Adopter, MaritalStatusUnion } from '../domain/adopter.entity';
import { AdopterAddress } from '@/adopter-address/domain/adopter-adress.entity';
import { ResourceFoundError } from '@/shared/application/errors/resource-found-error';
import type { AdopterRepository } from '../domain/adopter.repository';
import { Inject } from '@nestjs/common';
import { City } from '@/city/domain/city.entity';
import { StateUF } from '@/state-uf/domain/state-uf.entity';
import { AnimalDto } from '@/animals/infrastructure/dto/animal.dto';
import { TermDto } from '@/terms/infrastructure/dto/term.dto';

type TypeOfContact = 'celular' | 'telefone' | 'whatsapp';

type AdopterContactDto = {
  value: string;
  isPrincipal: boolean;
  type: TypeOfContact;
}

type AdopterAddressDto = {
    street: string;
    number: number;
    neighborhood: string;
    city: City;
    state: StateUF;
}

type Input = {
  name: string;
  dtOfBirth: Date;
  rg: string;
  cpf: string;
  email: string;
  contacts: AdopterContactDto[];
  profession: string;
  civilState: MaritalStatusUnion;
  addresses: AdopterAddressDto[];
  activeNotification: boolean;
  dtToNotify?: Date;
  animals?: AnimalDto[]; //TODO VERIFICAR AINDA
  terms?: TermDto[]; //TODO VERIFICAR AINDA
};

type Output = any;

export class CreateAdopterUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('AdopterRepository')
    private readonly adopterRepository: AdopterRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const cpfExists = await this.adopterRepository.existsCpf(input.cpf);
    if (cpfExists) {
      throw new ResourceFoundError(
        `Já existe um adotante com o CPF: ${input.cpf}`,
      );
    }

    const emailExists = await this.adopterRepository.existsEmail(input.email);
    if (emailExists) {
      throw new ResourceFoundError(
        `Já existe um adotante com o email: ${input.email}`,
      );
    }

    let notify = false;
    if (input.activeNotification) {
      if (input.dtToNotify) {
        const now = new Date();
        if (input.dtToNotify.getTime() < now.getTime()) {
          throw new ConflictError(
            'A data para notificação precisa ser futura a data atual',
          );
        }
        notify = true;
      } else {
        throw new ConflictError(
          'Deve existir uma data para notificação caso ela esteja ativa',
        );
      }
    }

    let addresses: AdopterAddress[];
    if(input.addresses && input.addresses.length > 0) {
        addresses = input.addresses.map((address) => {
          return new AdopterAddress({
            ...address
          })
        })
    }

    let contacts: AdopterContact[];
    if(input.contacts && input.contacts.length > 0) {
        contacts = input.contacts.map((contact) => {
          return new AdopterContact({
            ...contact
          })
        })
    }

    const adopter = Adopter.create({
      activeNotification: input.activeNotification,
      dtToNotify: input.activeNotification ? input.dtToNotify : null,
      civilState: input.civilState,
      cpf: input.cpf,
      dtOfBirth: input.dtOfBirth,
      email: input.email,
      name: input.name,
      rg: input.rg,
      profession: input.profession,
      createdByUserId: 'teste', //TODO AJUSTAR
      addresses: addresses,
      contacts: contacts,
      // animals: input.animals,
      // terms: input.terms
    })

    const entityAdopter = this.adopterRepository.create(adopter)

  }
}
