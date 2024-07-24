import { Motorista } from '../entities/motorista';
import { UtilitarioInMemory } from '../utils/utilitario-in-memory';
import { MotoristaRepository } from './../repository/motorista-repository';

export class MotoristaInMemory extends UtilitarioInMemory implements MotoristaRepository {

  private static dados: Motorista[] = [];
  private static nextId: number = 1;

  create(obj: Motorista): Motorista {
    return this.createObject(obj, MotoristaInMemory.nextId++, MotoristaInMemory.dados, Motorista);
  }

  findAll(): Motorista[] {
    return this.findAllObject(MotoristaInMemory.dados);
  }

  findById(id: number): Motorista | undefined {
    return this.findByIdObject(MotoristaInMemory.dados, id);
  }

  update(id: number, obj: Partial<Motorista>): Motorista | undefined {
    return this.updateObject(id, obj, this.findById.bind(this));
  }

  delete(id: number): Motorista | undefined {
    return this.deleteObject(MotoristaInMemory.dados, id);  
  }
  
}