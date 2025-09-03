export abstract class RepositoryBaseMapper<Schema, Entity> {
  abstract toEntity(schema: Schema): Entity | null;
  toSchema?(entity: Entity): Schema | null;

  toEntityMany(schemas: Schema[]): Entity[] {
    return schemas.map(schema => this.toEntity(schema)).filter(Boolean);
  }

  toSchemaMany(entities: Entity[]): Schema[] {
    return entities.map(entity => this.toSchema(entity)).filter(Boolean);
  }
}
