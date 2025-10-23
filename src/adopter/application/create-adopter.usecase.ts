import { AdopterContact } from '@/adopter-contact/domain/adopter-contact.entity';
import { ConflictError } from '@/shared/application/errors/conflict-error';
import { UseCase } from '@/shared/application/usecases/use-case';
import { Adopter, MaritalStatusUnion } from '../domain/adopter.entity';
import { AdopterAddress } from '@/adopter-address/domain/adopter-address.entity';
import { ResourceFoundError } from '@/shared/application/errors/resource-found-error';
import type { AdopterRepository } from '../domain/adopter.repository';
import { Inject, Injectable } from '@nestjs/common';
import { Animal } from '@/animals/domain/animal.entity';
import { AdopterOutput, AdopterOutputMapper } from './outputs/adopter.output';
import type { AnimalRepository } from '@/animals/domain/animal.repository';

type TypeOfContact = 'celular' | 'telefone' | 'whatsapp';

type AdopterContactDto = {
  value: string;
  isPrincipal: boolean;
  type: TypeOfContact;
};

type StateUfDto = {
  id: number;
  name: string;
  acronym: string;
};

type CityDto = {
  id: number;
  name: string;
  stateUf: StateUfDto;
};

type AdopterAddressDto = {
  street: string;
  number: number;
  neighborhood: string;
  city: CityDto;
};

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
  animalsIds?: string[];
};

type Output = AdopterOutput;

@Injectable()
export class CreateAdopterUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('AdopterRepository')
    private readonly adopterRepository: AdopterRepository,
    @Inject('AnimalRepository')
    private readonly animalRepository: AnimalRepository,
    private readonly adopterOutputMapper: AdopterOutputMapper,
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

    this.validateNotificationSetting(input);

    const addresses = this.createAddresses(input.addresses);
    const contacts = this.createContacts(input.contacts);

    let animals: Animal[] | undefined;
    if (input.animalsIds && input.animalsIds.length > 0) {
      animals = await this.animalRepository.findAllByIds(input.animalsIds);
      if (animals.length <= 0)
        throw new ResourceFoundError(
          `Nenhum animal foi encontrado para realizar o vínculo.`,
        );
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
      createdByUserId: '3038c222-58c4-4bfb-a213-650ca92d9d4c', //TODO AJUSTAR
      addresses: addresses,
      contacts: contacts,
      animals: animals,
    });

    await this.adopterRepository.create(adopter.toJSON());

    return this.adopterOutputMapper.toOutput(adopter);
  }

  private validateNotificationSetting(input: Input) {
    if (input.activeNotification) {
      if (!input.dtToNotify) {
        throw new ConflictError(
          'Deve existir uma data para notificação caso ela esteja ativa',
        );
      }

      const now = new Date();
      if (input.dtToNotify.getTime() < now.getTime()) {
        throw new ConflictError(
          'A data para notificação precisa ser futura a data atual',
        );
      }
    }
  }

  private createAddresses(addressesDto: AdopterAddressDto[]): AdopterAddress[] {
    if (!addressesDto || addressesDto.length === 0) {
      return [];
    }

    return addressesDto.map(address => new AdopterAddress(address));
  }

  private createContacts(contactsDto: AdopterContactDto[]): AdopterContact[] {
    if (!contactsDto || contactsDto.length === 0) {
      return [];
    }

    return contactsDto.map(contact => new AdopterContact(contact));
  }
}
