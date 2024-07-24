export interface GenericCrudRepository<Type> {
    create(obj: Type): Type;
    findAll(): Type[];
    findById(id: number): Type | undefined;
    update(id: number, obj: Partial<Type>): Type | undefined;
    delete(id: number): Type | undefined;
}