import { Carro } from "../entities/carro";
import { CarroRepository } from "../repository/carro-repository";

export class CarroInMemory implements CarroRepository {
  
  private static dados: Carro[] = [];
  private static nextId: number = 1;

  public create(obj: Carro): Carro {
    obj.id = CarroInMemory.nextId++;
    const newObj = new Carro(obj);
    CarroInMemory.dados.push(newObj);
    return newObj;
  }

  public findAll(): Carro[] {
    return CarroInMemory.dados;
  }
  
  public findById(id: number): Carro | undefined {
    return CarroInMemory.dados.find(car => car.id === id);
  }

  public update(id: number, obj: Partial<Carro>): Carro | undefined {
    const objBanco = this.findById(id);

    if (objBanco) {
      Object.assign(objBanco, obj);
    }

    return objBanco;
  }
  
  public delete(id: number): Carro | undefined {
    const index = CarroInMemory.dados.findIndex(obj => obj.id === id);
    if (index !== -1) {
      return CarroInMemory.dados.splice(index, 1)[0];
    }
    return undefined;
  }

}