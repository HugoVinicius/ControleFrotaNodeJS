import { VeiculoInMemory } from './../veiculo-in-memory';
import { Veiculo } from './../../entities/veiculo';
import { UtilizacaoVeiculoInMemory } from './../utilizacao-veiculo-in-memory';
import { MotoristaInMemory } from '../motorista-in-memory';
import { Motorista } from '../../entities/motorista';
import { before } from 'node:test';
import { RetornoPadrao } from '../../utils/retorno-padrao';
import { UtilizacaoVeiculo } from '../../entities/utilizacao-veiculo';


describe('Utilizacao Veiculo InMemory', () => {

  const utilizacaoVeiculoInMemory = new UtilizacaoVeiculoInMemory();
  const motoristaInMemory = new MotoristaInMemory();
  const veiculoInMemory = new VeiculoInMemory();

  let veiculo: Veiculo;
  let motorista: Motorista;

  before(() => {
    veiculo = veiculoInMemory.create({id: 0, placa: 'QNU-7122', cor: 'Vermelha', marca: 'Honda'} );
    motorista = motoristaInMemory.create({id: 0, nome: 'Caio'});
  })

  it('Deve criar uma utilização com sucesso', () => {
    const utilizacaoCreate = utilizacaoVeiculoInMemory.createUtilizacaoVeiculoDTO({
      idMotorista: motorista.id,
      idVeiculo: veiculo.id,
      dataInicio: new Date(),
      motivo: "Buscando peça na manutenção",
    });

    expect(utilizacaoCreate.retorno.id).toBeDefined();
    expect(utilizacaoCreate.retorno.motorista.id).toBe(motorista.id);
    expect(utilizacaoCreate.retorno.veiculo.id).toBe(veiculo.id);
  })

  it('Teste para realizar dois lançamentos sem finalização, tem que ocorrer erro', () => {
    const utilizacaoCreate = utilizacaoVeiculoInMemory.createUtilizacaoVeiculoDTO({
      idMotorista: motorista.id,
      idVeiculo: veiculo.id,
      dataInicio: new Date(),
      motivo: "Entregar mercadoria para a cliente Fernanda",
    });

    expect(utilizacaoCreate.sucesso).toBe(false);
  })

  it('Teste para realizar dois lançamentos sem finalização, tem que ocorrer erro', () => {
    const utilizacaoCreate = utilizacaoVeiculoInMemory.createUtilizacaoVeiculoDTO({
      idMotorista: motorista.id,
      idVeiculo: veiculo.id,
      dataInicio: new Date(),
      motivo: "Entregar mercadoria para a cliente Fernanda",
    });

    expect(utilizacaoCreate.sucesso).toBe(false);
  })
})