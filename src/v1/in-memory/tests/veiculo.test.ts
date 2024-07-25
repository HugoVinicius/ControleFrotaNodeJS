import { Veiculo } from "../../entities/veiculo";
import { VeiculoInMemory } from "../veiculo-in-memory";

describe('Veiculo teste InMemory', () => {

  const veiculoInMemory = new VeiculoInMemory();

  it('Deve criar um veiculo com sucesso', () => {
    const veiculo = new Veiculo({
      id: 123,
      placa: "HGB-9954",
      cor: "Azul",
      marca: "Fiat"
    });

    const veiculoCreate = veiculoInMemory.create(veiculo);
    expect(veiculoCreate.marca).toBe(veiculo.marca);
  })

  it('Criando veiculo sem o campo obrigatório, tem que ocorrer erro', () => {
    let err;

    try {
      veiculoInMemory.create({id: 153} as any);
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(Error);
  })


  it('Removendo um veiculo que não existe, tem que ocorrer erro', () => {
    const veiculo = veiculoInMemory.delete(126); 
    expect(veiculo).toBeUndefined();
  })
  
})