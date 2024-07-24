import { Motorista } from '../entities/motorista';
import { MotoristaRepository } from './../repository/motorista-repository';

export class MotoristaInMemory implements MotoristaRepository {

  private static dados = Motorista[] = [];
  private static nextId: number = 1;

  create(obj: Motorista): Motorista {
    obj.id = MotoristaInMemory.nextId++;
    const newObj = new Motorista(obj);
    MotoristaInMemory.dados.push(newObj);
    return newObj;
  }

  findAll(): Motorista[] {
    throw new Error('Method not implemented.');
  }

  findById(id: number): Motorista | undefined {
    throw new Error('Method not implemented.');
  }

  update(id: number, obj: Partial<Motorista>): Motorista | undefined {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Motorista | undefined {
    throw new Error('Method not implemented.');
  }
  
}