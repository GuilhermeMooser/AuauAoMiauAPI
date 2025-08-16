export interface Repository<Entity>
  extends FindByIdRepository<Entity>,
    CreateRepository<Entity>,
    UpdateRepository<Entity>,
    SoftDeleteRepository {}

export interface FindByIdRepository<Entity> {
  findById(id: number): Promise<Entity>;
}

export interface CreateRepository<Entity> {
  create(entity: Partial<Entity>): Promise<Entity>;
}

export interface UpdateRepository<Entity> {
  update(entity: Entity): Promise<Entity>;
}

export interface SoftDeleteRepository {
  softDeleteById(categoryId: number): Promise<void>;
}
