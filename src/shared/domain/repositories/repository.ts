export interface Repository<Entity>
  extends FindByIdRepository<Entity>,
    CreateRepository<Entity>,
    UpdateRepository<Entity>,
    SoftDeleteRepository {}

export interface FindByIdRepository<Entity> {
  findById(id: string): Promise<Entity>;
}

export interface CreateRepository<Entity> {
  create(entity: Partial<Entity>): Promise<Entity>;
}

export interface UpdateRepository<Entity> {
  update(entity: Entity): Promise<Entity>;
}

export interface SoftDeleteRepository {
  softDeleteById(id: string): Promise<void>;
}
