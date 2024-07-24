import { UtilizacaoVeiculoRepository } from '../repository/utilizacao-veiculo-repository';
import { UtilitarioInMemory } from '../utils/utilitario-in-memory';
import { UtilizacaoVeiculo } from './../entities/utilizacao-veiculo';

export class UtilizacaoVeiculoInMemory extends UtilitarioInMemory implements UtilizacaoVeiculoRepository {

  private static dados: UtilizacaoVeiculo[] = [];
  private static nextId: number = 1;

  create(obj: UtilizacaoVeiculo): UtilizacaoVeiculo {
    return this.createObject(obj, UtilizacaoVeiculoInMemory.nextId++, UtilizacaoVeiculoInMemory.dados, UtilizacaoVeiculo);
  }

  findAll(): UtilizacaoVeiculo[] {
    return this.findAllObject(UtilizacaoVeiculoInMemory.dados);
  }

  findById(id: number): UtilizacaoVeiculo | undefined {
    return this.findByIdObject(UtilizacaoVeiculoInMemory.dados, id);
  }

  update(id: number, obj: Partial<UtilizacaoVeiculo>): UtilizacaoVeiculo | undefined {
    return this.updateObject(id, obj, this.findById.bind(this));
  }

  delete(id: number): UtilizacaoVeiculo | undefined {
    return this.deleteObject(UtilizacaoVeiculoInMemory.dados, id);
  }
}