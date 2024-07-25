import { UtilizacaoVeiculoDTO } from '../dto/utilizacao-cadastro-dto';
import { UtilizacaoVeiculoRepository } from '../repository/utilizacao-veiculo-repository';
import { NAO_EXISTE_UTILIZACAO_EM_ABERTO, UTILIZACAO_FINALIZADA, UTILIZACAO_NAO_EXCLUIR, UTILIZACAO_NOT_FOUND } from '../utils/constantes';
import { RetornoPadrao } from '../utils/retorno-padrao';
import { UtilitarioInMemory } from '../utils/utilitario-in-memory';
import { UtilizacaoVeiculo, UtilizacaoVeiculoType } from './../entities/utilizacao-veiculo';
import { MotoristaInMemory } from './motorista-in-memory';
import { VeiculoInMemory } from './veiculo-in-memory';

export class UtilizacaoVeiculoInMemory extends UtilitarioInMemory implements UtilizacaoVeiculoRepository {

  private static dados: UtilizacaoVeiculo[] = [];
  private static nextId: number = 1;

  createUtilizacaoVeiculoDTO(utilizacaoCad: UtilizacaoVeiculoDTO): RetornoPadrao<UtilizacaoVeiculo> {
     
    const retorno = new RetornoPadrao<UtilizacaoVeiculo>({
      mensagem: "",
      sucesso: false,
      retorno: null
    });

    if (utilizacaoCad.motivo === null || utilizacaoCad.motivo === undefined || utilizacaoCad.motivo.trim() == "") {
      retorno.sucesso = false;
      retorno.mensagem = "É necessário informar o motivo";
      return retorno;
    }

    if (utilizacaoCad.dataInicio === null || utilizacaoCad.dataInicio === undefined) {
      retorno.sucesso = false;
      retorno.mensagem = "É necessário informar a data de Inicio";
      return retorno;
    }

    const motoristaIm = new MotoristaInMemory();
    const motoristaCadastrado = motoristaIm.findById(utilizacaoCad.idMotorista);

    if (motoristaCadastrado === null || motoristaCadastrado === undefined) {
      retorno.sucesso = false;
      retorno.mensagem = `Não é possível localizar o motórista com o identificador ${utilizacaoCad.idMotorista}`;
      return retorno;
    }

    const veiculoIm = new VeiculoInMemory();
    const veiculoCadastrado = veiculoIm.findById(utilizacaoCad.idVeiculo);

    if (veiculoCadastrado === null || veiculoCadastrado === undefined) {
      retorno.sucesso = false;
      retorno.mensagem = `Não é possível localizar o veiculo: ${utilizacaoCad.idVeiculo}`;
      return retorno;
    }

    const veiculoMotoristaEmUso = this.veiculoMotoristaEmUso(veiculoCadastrado.id, motoristaCadastrado.id, utilizacaoCad.dataInicio);

    if (veiculoMotoristaEmUso != null) {
      retorno.sucesso = false;
      retorno.mensagem = `O veiculo ${utilizacaoCad.idVeiculo} ou o motorista ${utilizacaoCad.idMotorista} estão com utilização sem baixa`;
      return retorno;
    }

    const utilizacaoVeiculo = new UtilizacaoVeiculo({
      id: 0,
      dataInicio: utilizacaoCad.dataInicio,
      motivo: utilizacaoCad.motivo,
      veiculo: veiculoCadastrado,
      motorista: motoristaCadastrado
    });

    retorno.retorno = this.createObject(utilizacaoVeiculo, UtilizacaoVeiculoInMemory.nextId++, UtilizacaoVeiculoInMemory.dados, UtilizacaoVeiculo);
    return retorno;
  }

  create(obj: UtilizacaoVeiculo): UtilizacaoVeiculo {
    return this.createObject(obj, UtilizacaoVeiculoInMemory.nextId++, UtilizacaoVeiculoInMemory.dados, UtilizacaoVeiculo);
  }

  /**
   * Validação da regra de negocio
   * 
   * Um automóvel só pode ser utilizado por um motorista por vez. 
   * Um motorista que já esteja utilizando um automóvel não pode utilizar outro automóvel ao mesmo tempo.
   * 
   * Obsevação: Como estou utilizando banco de dados em memória tenho que simular a query
   *  
   * @param veiculo 
   * @param motorista 
   * @param dataInicio 
   * @param dataFim 
   * @returns 
   */
  veiculoMotoristaEmUso(idVeiculo: number, idMotorista: number, dataInicio: Date): UtilizacaoVeiculo | null {
    try {
      const utilizacaoEmAberto = UtilizacaoVeiculoInMemory.dados.find(utilizacao => {
        return (utilizacao.dataFim == null || utilizacao.dataFim == undefined) &&
          (utilizacao.veiculo.id == idVeiculo || utilizacao.motorista.id == idMotorista)
      });

      if (!utilizacaoEmAberto) {
        return null;
      }

      return utilizacaoEmAberto;
    } catch (error) {
      console.log(`${NAO_EXISTE_UTILIZACAO_EM_ABERTO} - ${error}`);
      return null;
    }
  }

  /**
   * Finalizar Utilização do veiculo
   * 
   * @param idUtilizacao 
   * @returns 
   */

  endUseVehicle(idUtilizacao: number): UtilizacaoVeiculo | undefined {
    const utilizacao = this.findById(idUtilizacao);

    if (!utilizacao || utilizacao == undefined) {
      throw new Error(UTILIZACAO_NOT_FOUND);
    }

    if (utilizacao.dataFim != null) {
      throw new Error(UTILIZACAO_FINALIZADA);
    }

    utilizacao.dataFim = new Date();
    return this.update(idUtilizacao, utilizacao);
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

    const utilizacaoBusca = this.findById(id);

    if (utilizacaoBusca && utilizacaoBusca != undefined) {
      if (utilizacaoBusca.dataFim == null) {
        return this.deleteObject(UtilizacaoVeiculoInMemory.dados, id);
      }

      throw new Error(UTILIZACAO_NAO_EXCLUIR);
    }

    return undefined;
  }
}