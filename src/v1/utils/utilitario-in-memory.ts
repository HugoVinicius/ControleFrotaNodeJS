export class UtilitarioInMemory {

  public createObject<T>(obj: T, nextId: number, array: T[], ClassType: { new(obj: T): T }): T {
    (obj as any).id = nextId;
    const newObj = new ClassType(obj);
    array.push(newObj);
    return newObj;
  }

  public findAllObject<T>(array: T[]): T[] {
    return array;
  }

  public findByIdObject<T>(array: T[], id: number): T | undefined {
    return array.find(obj => (obj as any).id === id);
  }

  public updateObject<T>(id: number, obj: Partial<T>, findById: (id: number) => T | undefined): T | undefined {
    const objBanco = findById(id);
    if (objBanco) {
      Object.assign(objBanco, obj);
    }
    return objBanco;
  }

  public deleteObject<T>(array: T[], id: number): T | undefined {
    const index = array.findIndex(obj => (obj as any).id === id);
    if (index !== -1) {
      return array.splice(index, 1)[0];
    }
    return undefined;
  }
}