import { Veiculo } from "../entities/veiculo";
import { VeiculoRepository } from "../repository/veiculo-repository";
import { VEICULO_VALIDACAO_PLACA } from "../utils/constantes";
import { UtilitarioInMemory } from "../utils/utilitario-in-memory";

export class VeiculoInMemory extends UtilitarioInMemory implements VeiculoRepository {
  
  private static dados: Veiculo[] = [];
  private static nextId: number = 1;

  public create(obj: Veiculo): Veiculo {  

    if (obj.placa == null || obj.placa == undefined || obj.placa.trim() == "") {
      throw new Error(VEICULO_VALIDACAO_PLACA);
    }
    
    return this.createObject(obj, VeiculoInMemory.nextId++, VeiculoInMemory.dados, Veiculo);
  }

  public findAll(): Veiculo[] {
    return this.findAllObject(VeiculoInMemory.dados);
  }
  
  public findById(id: number): Veiculo | undefined {
    return this.findByIdObject(VeiculoInMemory.dados, id);
  }

  public update(id: number, obj: Partial<Veiculo>): Veiculo | undefined {
    return this.updateObject(id, obj, this.findById.bind(this));
  }
  
  public delete(id: number): Veiculo | undefined {
    return this.deleteObject(VeiculoInMemory.dados, id);    
  }
}