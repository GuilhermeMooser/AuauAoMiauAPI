import { BaseProps, Entity } from '@/shared/domain/entity';

export abstract class OutputMapper<
  E extends Entity<BaseProps>,
  Output extends object,
> {
  abstract toOutput(entity: E): Output;

  protected toOutputArray<RE extends Entity<BaseProps>, RO extends object>(
    entities: RE[] | undefined,
    mapper: OutputMapper<RE, RO>,
  ): RO[] {
    if (!entities || entities.length === 0) return [];
    return entities.map(entity => mapper.toOutput(entity));
  }
}
