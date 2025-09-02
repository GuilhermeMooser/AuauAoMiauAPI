export abstract class RepositoryBaseMapper<Schema, Entity> {
  toEntity?(schema: Schema): Entity;
  toSchema?(entity: Entity): Schema;

  toEntityMany(
    schemas: Schema[],
    mapperFn: (schema: Schema) => Entity,
  ): Entity[] {
    return schemas.map(mapperFn).filter(Boolean);
  }

  toSchemaMany(
    entities: Entity[],
    mapperFn: (entity: Entity) => Schema,
  ): Schema[] {
    return entities.map(mapperFn).filter(Boolean);
  }
}
