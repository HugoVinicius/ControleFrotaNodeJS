import { Carro } from "../entities/carro";
import { CarroRepository } from "../repository/carro-repository";

export class CarroInMemory implements CarroRepository {
  
  private static carros: Carro[] = [];
  private static nextId: number = 1;

  public create(obj: Carro): Carro {
    obj.id = CarroInMemory.nextId++;
    const carro = new Carro(obj);
    CarroInMemory.carros.push(carro);
    return carro;
  }

  public findAll(): Carro[] {
    return CarroInMemory.carros;
  }
  
  public findById(id: number): Carro | undefined {
    return CarroInMemory.carros.find(car => car.id === id);
  }

  public update(id: number, obj: Partial<Carro>): Carro | undefined {
    const car = this.findById(id);

    if (car) {
      Object.assign(car, obj);
    }

    return car;
  }
  
  public delete(id: number): Carro | undefined {
    const index = CarroInMemory.carros.findIndex(car => car.id === id);
    if (index !== -1) {
      return CarroInMemory.carros.splice(index, 1)[0];
    }
    return undefined;
  }

}