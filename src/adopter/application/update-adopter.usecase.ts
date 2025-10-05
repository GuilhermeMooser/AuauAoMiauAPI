import { UseCase } from '@/shared/application/usecases/use-case';
import { Inject, Injectable } from '@nestjs/common';
import type { AdopterRepository } from '../domain/adopter.repository';
import { AdopterOutput, AdopterOutputMapper } from './outputs/adopter.output';
import { Adopter, MaritalStatusUnion } from '../domain/adopter.entity';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';
import { NotFoundError } from '@/shared/application/errors/not-found-error';
import { ResourceFoundError } from '@/shared/application/errors/resource-found-error';
import { ConflictError } from '@/shared/application/errors/conflict-error';
import { AdopterAddress } from '@/adopter-address/domain/adopter-address.entity';
import { AdopterContact } from '@/adopter-contact/domain/adopter-contact.entity';
import type { AnimalRepository } from '@/animals/domain/animal.repository';
import { Animal } from '@/animals/domain/animal.entity';
import type { AdopterAddressRepository } from '@/adopter-address/domain/adopter-address.repository';
import type { AdopterContactRepository } from '@/adopter-contact/domain/adopter-contact.repository';

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
  country: string;
};

type CityDto = {
  id: number;
  name: string;
  stateUf: StateUfDto;
  ibge: number;
};

type AdopterAddressDto = {
  street: string;
  number: number;
  neighborhood: string;
  city: CityDto;
};

type Input = {
  id: string;
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
export class UpdateAdopterUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('AdopterRepository')
    private readonly adopterRepository: AdopterRepository,
    @Inject('AnimalRepository')
    private readonly animalRepository: AnimalRepository,
    @Inject('AdopterAddressRepository')
    private readonly adopterAddressRepository: AdopterAddressRepository,
    @Inject('AdopterContactRepository')
    private readonly adopterContactRepository: AdopterContactRepository,
    private readonly adopterOutputMapper: AdopterOutputMapper,
  ) {}

  async execute(input: Input): Promise<Output> {
    if (!input.id) {
      throw new ConflictError(
        'Não foi possível realizar a atualização devido à falta do identificador único',
      );
    }

    const adopter = await this.adopterRepository.findById(input.id);
    if (!adopter) {
      throw new NotFoundError('Adotante não encontrado!');
    }

    if (input.email !== adopter.email) {
      const emailExists = await this.adopterRepository.existsEmail(input.email);
      if (emailExists) {
        throw new ResourceFoundError(
          `Já existe um adotante com o email: ${input.email}`,
        );
      }
    }

    if (input.cpf !== adopter.cpf) {
      const cpfExists = await this.adopterRepository.existsCpf(input.cpf);
      if (cpfExists) {
        throw new ResourceFoundError(
          `Já existe um adotante com o CPF: ${input.cpf}`,
        );
      }
    }

    this.validateNotificationSetting(input);
    this.validateContactsAndAddresses(input);

    await this.removeAddresses(adopter.addresses);
    await this.removeContacts(adopter.contacts);

    const addresses = this.createAddresses(input.addresses);
    const contacts = this.createContacts(input.contacts);

    let animals: Animal[] | undefined;
    if (input.animalsIds && input.animalsIds.length > 0) {
      animals = await this.animalRepository.findAllByIds(input.animalsIds);
      if (animals.length !== input.animalsIds.length) {
        throw new ResourceFoundError(
          'Algum animal não possui correspondência na base de dados.',
        );
      }

      if (animals.length <= 0) {
        throw new ResourceFoundError(
          `Nenhum animal foi encontrado para realizar o vínculo.`,
        );
      }

      await this.handleAnimalsFromAdopter(adopter.animals, input.animalsIds);
    } else {
      await this.removeAllAnimalRelationships(adopter.animals);
    }

    adopter.update({
      name: input.name,
      dtOfBirth: input.dtOfBirth,
      rg: input.rg,
      cpf: input.cpf,
      email: input.email,
      profession: input.profession,
      civilState: input.civilState,
      activeNotification: input.activeNotification,
      dtToNotify: input.activeNotification ? input.dtToNotify : null,
      addresses: addresses,
      contacts: contacts,
      animals: animals,
      updatedByUserId: '3038c222-58c4-4bfb-a213-650ca92d9d4c', //TODO AJUSTAR
    });

    await this.adopterRepository.update(adopter.toJSON());

    return this.adopterOutputMapper.toOutput(adopter);
  }

  private async removeAllAnimalRelationships(animals: Animal[]): Promise<void> {
    const animalIds = animals?.map(animal => animal.id);

    if (animalIds && animalIds.length > 0) {
      await this.animalRepository.removeAdopterReference(animalIds);
    }
  }

  private async handleAnimalsFromAdopter(
    adopterAnimals: Animal[],
    newAnimalIds: string[],
  ) {
    const currentAnimalsIds = adopterAnimals?.map(animal => animal.id);

    const animalsToRemove = currentAnimalsIds?.filter(
      id => !newAnimalIds.includes(id),
    );

    if (animalsToRemove && animalsToRemove.length > 0) {
      await this.animalRepository.removeAdopterReference(animalsToRemove);
    }
  }

  private validateContactsAndAddresses(input: Input) {
    if (!input.addresses || input.addresses.length <= 0) {
      throw new ConflictError('É necessário possuir ao menos um endereço');
    }
    if (!input.contacts || input.contacts.length <= 0) {
      throw new ConflictError('É necessário possuir ao menos um contato');
    }
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

  private async removeAddresses(addresses: AdopterAddress[]) {
    const ids = addresses?.map(address => address.id);
    await this.adopterAddressRepository.removeAllByIds(ids);
  }

  private async removeContacts(contacts: AdopterContact[]) {
    const ids = contacts?.map(contact => contact.id);
    await this.adopterContactRepository.removeAllByIds(ids);
  }
}
