import express, { Request, Response } from 'express';
import { UtilizacaoVeiculoInMemory } from '../in-memory/utilizacao-veiculo-in-memory';
import { RetornoPadrao } from '../utils/retorno-padrao';
import { UtilizacaoVeiculo } from '../entities/utilizacao-veiculo';
import { CADASTRO_SUCESSO, DELETE_SUCESSO, UTILIZACAO_FALHA_CADASTRO, UTILIZACAO_FINALIZADA_SUCESSO, UTILIZACAO_NOT_FOUND } from '../utils/constantes';
import { Utilitario } from '../utils/utilitarios';

const utilizacaoVeiculoRoutes = express.Router();
const utilizacaoVeiculoMemory = new UtilizacaoVeiculoInMemory();

utilizacaoVeiculoRoutes.post('/', (req: Request, res: Response) => {
  const retorno = new RetornoPadrao<UtilizacaoVeiculo>({ sucesso: true, mensagem: CADASTRO_SUCESSO, retorno: null });
  try {
    res.status(201).json(utilizacaoVeiculoMemory.createUtilizacaoVeiculoDTO(req.body));
  } catch (error) {
    Utilitario.handleError(res, error, retorno);
  }
});

utilizacaoVeiculoRoutes.post('/finalizar/:id', (req: Request, res: Response) => {
  const retorno = new RetornoPadrao<UtilizacaoVeiculo>({ sucesso: true, mensagem: UTILIZACAO_FINALIZADA_SUCESSO, retorno: null });

  try {
    const newObj = utilizacaoVeiculoMemory.endUseVehicle(Number(req.params.id));
    retorno.retorno = newObj;
    res.status(201).json(retorno);
  } catch (error) {
    Utilitario.handleError(res, error, retorno);
  }
});

utilizacaoVeiculoRoutes.get('/', (req: Request, res: Response) => {
  const retorno = new RetornoPadrao<UtilizacaoVeiculo[]>({ sucesso: true, mensagem: "", retorno: null });

  try {
    retorno.retorno = utilizacaoVeiculoMemory.findAll();
    res.json(retorno);
  } catch (error) {
    Utilitario.handleError(res, error, retorno);
  }
});

utilizacaoVeiculoRoutes.get('/:id', (req: Request, res: Response) => {
  const retorno = new RetornoPadrao<UtilizacaoVeiculo>({ sucesso: true, mensagem: "", retorno: null });
  try {
    const objBusca = utilizacaoVeiculoMemory.findById(Number(req.params.id));
    if (objBusca) {
      retorno.retorno = objBusca;
      res.json(retorno);
    } else {
      retorno.sucesso = false;
      retorno.mensagem = UTILIZACAO_NOT_FOUND;
      res.status(404).json(retorno);
    }
  } catch (error) {
    Utilitario.handleError(res, error, retorno);
  }
});

utilizacaoVeiculoRoutes.delete('/:id', (req: Request, res: Response) => {
  const retorno = new RetornoPadrao<UtilizacaoVeiculo>({ sucesso: true, mensagem: DELETE_SUCESSO, retorno: null });
  try {
    const objFinder = utilizacaoVeiculoMemory.delete(Number(req.params.id));
    if (objFinder) {
      retorno.retorno = objFinder;
      res.json(retorno);
    } else {
      retorno.sucesso = false;
      retorno.mensagem = UTILIZACAO_NOT_FOUND;
      res.status(404).json(retorno);
    }
  } catch (error) {
    Utilitario.handleError(res, error, retorno);
  }
});


export default utilizacaoVeiculoRoutes;