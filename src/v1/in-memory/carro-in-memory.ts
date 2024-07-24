import { Carro } from "../entities/carro";
import { CarroRepository } from "../repository/carro-repository";
import { UtilitarioInMemory } from "../utils/utilitario-in-memory";

export class CarroInMemory extends UtilitarioInMemory implements CarroRepository {
  
  private static dados: Carro[] = [];
  private static nextId: number = 1;

  public create(obj: Carro): Carro {  

    if (obj.placa == null || obj.placa == undefined || obj.placa.trim() == "") {
      throw new Error("É necessário infomar a placa do veiculo!");
    }
    
    return this.createObject(obj, CarroInMemory.nextId++, CarroInMemory.dados, Carro);
  }

  public findAll(): Carro[] {
    return this.findAllObject(CarroInMemory.dados);
  }
  
  public findById(id: number): Carro | undefined {
    return this.findByIdObject(CarroInMemory.dados, id);
  }

  public update(id: number, obj: Partial<Carro>): Carro | undefined {
    return this.updateObject(id, obj, this.findById.bind(this));
  }
  
  public delete(id: number): Carro | undefined {
    return this.deleteObject(CarroInMemory.dados, id);    
  }
}