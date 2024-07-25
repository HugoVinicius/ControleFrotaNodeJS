import { Motorista } from "../../entities/motorista";
import { MotoristaInMemory } from "../motorista-in-memory";

describe('Motorista teste InMemory', () => {
  
  const motoristaInMemory = new MotoristaInMemory();

  const motorista = new Motorista({
    id: 123,
    nome: "Hugo Vinicius",
  }) 

  it('Deve criar um motorista com sucesso', () => {
    const motoristaCreate = motoristaInMemory.create(motorista);
    
    expect(motoristaCreate.id).toBeDefined();
    expect(motoristaCreate.id).toBe(motorista.id);
  })

  it('Deve localizar um motorista criado', () => {
    const motoristaBusca = motoristaInMemory.findById(motorista.id);    
    expect(motoristaBusca?.nome).toBe(motorista.nome);
  })

  it('Criando um motorista sem o nome, tem que ocorrer error', () => {
    let err;

    try {
      motoristaInMemory.create({ id: 1 } as any);
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(Error);

  })

  it('Removendo um motorista que não existe, tem que ocorrer erro', () => {
    const motorista = motoristaInMemory.delete(2000);
    expect(motorista).toBeUndefined();
  })



})