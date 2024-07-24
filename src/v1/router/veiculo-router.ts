
import express, { Request, Response } from 'express';
import { VeiculoInMemory } from '../in-memory/veiculo-in-memory';
import { RetornoPadrao } from '../utils/retorno-padrao';
import { Veiculo } from '../entities/veiculo';
import { CADASTRO_SUCESSO, VEICULO_FALHA_CADASTRO, VEICULO_NOT_FOUND, DELETE_SUCESSO } from '../utils/constantes';
import { Utilitario } from '../utils/utilitarios';

const veiculoRoutes = express.Router();
const veiculoInMemory = new VeiculoInMemory();

veiculoRoutes.post('/', (req: Request, res: Response) => {
  const retorno = new RetornoPadrao<Veiculo>({ sucesso: true, mensagem: CADASTRO_SUCESSO, retorno: null });

  try {
    const newObj = veiculoInMemory.create(req.body);

    if (newObj == null || newObj == undefined) {
       retorno.sucesso = false;
      retorno.mensagem = VEICULO_FALHA_CADASTRO;
    }

    retorno.retorno = newObj;   
    res.status(201).json(retorno);
  } catch (error) {
    Utilitario.handleError(res, error, retorno);
  }
});

veiculoRoutes.get('/', (req: Request, res: Response) => {
  const retorno = new RetornoPadrao<Veiculo[]>({ sucesso: true, mensagem: "", retorno: null });

  try {
    retorno.retorno = veiculoInMemory.findAll();
    res.json(retorno);
  } catch (error) {
    Utilitario.handleError(res, error, retorno);
  }
});

veiculoRoutes.get('/:id', (req: Request, res: Response) => {
  const retorno = new RetornoPadrao<Veiculo>({ sucesso: true, mensagem: "", retorno: null });
  try {
    const objBusca = veiculoInMemory.findById(Number(req.params.id));
    if (objBusca) {
      retorno.retorno = objBusca;
      res.json(retorno);
    } else {
      retorno.sucesso = false;
      retorno.mensagem = VEICULO_NOT_FOUND;
      res.status(404).json(retorno);
    }
  } catch (error) {
    Utilitario.handleError(res, error, retorno);
  }
});

veiculoRoutes.put('/:id', (req: Request, res: Response) => {
  const retorno = new RetornoPadrao<Veiculo>({ sucesso: true, mensagem: "", retorno: null });
  try {
    const objAlterado = veiculoInMemory.update(Number(req.params.id), req.body);
    if (objAlterado) {
      retorno.retorno = objAlterado;
      res.json(retorno);
    } else {
      retorno.sucesso = false;
      retorno.mensagem = VEICULO_NOT_FOUND;
      res.status(404).json(retorno);
    }
  } catch (error) {
    Utilitario.handleError(res, error, retorno);
  }
});

veiculoRoutes.delete('/:id', (req: Request, res: Response) => {
  const retorno = new RetornoPadrao<Veiculo>({ sucesso: true, mensagem: DELETE_SUCESSO, retorno: null });
  try {
    const objFinder = veiculoInMemory.delete(Number(req.params.id));
    if (objFinder) {
      retorno.retorno = objFinder;      
      res.json(retorno);
    } else {
      retorno.sucesso = false;
      retorno.mensagem = VEICULO_NOT_FOUND;
      res.status(404).json(retorno);
    }
  } catch (error) {
    Utilitario.handleError(res, error, retorno);
  }
});

export default veiculoRoutes;