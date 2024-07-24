import express, { Request, Response } from 'express';
import { UtilizacaoVeiculoInMemory } from '../in-memory/utilizacao-veiculo-in-memory';
import { RetornoPadrao } from '../utils/retorno-padrao';
import { UtilizacaoVeiculo } from '../entities/utilizacao-veiculo';
import { CADASTRO_SUCESSO, UTILIZACAO_FALHA_CADASTRO } from '../utils/constantes';
import { Utilitario } from '../utils/utilitarios';

const utilizacaoVeiculoRoutes = express.Router();
const utilizacaoVeiculoMemory = new UtilizacaoVeiculoInMemory();

utilizacaoVeiculoRoutes.post('/', (req: Request, res: Response) => {
  const retorno = new RetornoPadrao<UtilizacaoVeiculo>({ sucesso: true, mensagem: CADASTRO_SUCESSO, retorno: null });

  try {
    const newObj = utilizacaoVeiculoMemory.create(req.body);

    if (newObj == null || newObj == undefined) {
      retorno.sucesso = false;
      retorno.mensagem = UTILIZACAO_FALHA_CADASTRO;
    }

    retorno.retorno = newObj;
    res.status(201).json(retorno);
  } catch (error) {
    Utilitario.handleError(res, error, retorno);
  }
});

export default utilizacaoVeiculoRoutes;