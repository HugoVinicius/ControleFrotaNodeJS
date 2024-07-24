
import express, { Request, Response } from 'express';
import { MotoristaInMemory } from '../in-memory/motorista-in-memory';
import { CADASTRO_SUCESSO, DELETE_SUCESSO, MOTORISTA_FALHA_CADASTRO, MOTORISTA_NOT_FOUND } from '../utils/constantes';
import { Utilitario } from '../utils/utilitarios';
import { RetornoPadrao } from '../utils/retorno-padrao';
import { Motorista } from '../entities/motorista';

const motoristaRoutes = express.Router();
const motoristaInMemory = new MotoristaInMemory();

motoristaRoutes.post('/', (req: Request, res: Response) => {

  const retorno = new RetornoPadrao<Motorista>({ sucesso: true, mensagem: CADASTRO_SUCESSO, retorno: null });

  try {
    const newObj = motoristaInMemory.create(req.body);

    if (newObj == null || newObj == undefined) {
      retorno.sucesso = false;
      retorno.mensagem = MOTORISTA_FALHA_CADASTRO;
    }

    retorno.retorno = newObj;
    res.status(201).json(retorno);
  } catch (error) {
    Utilitario.handleError(res, error, retorno);
  }
});

motoristaRoutes.get('/', (req: Request, res: Response) => {

  const retorno = new RetornoPadrao<Motorista[]>({ sucesso: true, mensagem: "", retorno: null });

  try {
    retorno.retorno = motoristaInMemory.findAll();
    res.json(retorno);
  } catch (error) {
    Utilitario.handleError(res, error, retorno);
  }
});

motoristaRoutes.get('/:id', (req: Request, res: Response) => {
  const retorno = new RetornoPadrao<Motorista>({ sucesso: true, mensagem: "", retorno: null });
  try {
    const objBusca = motoristaInMemory.findById(Number(req.params.id));
    if (objBusca) {
      retorno.retorno = objBusca;
      res.json(retorno);
    } else {
      retorno.sucesso = false;
      retorno.mensagem = MOTORISTA_NOT_FOUND;
      res.status(404).json(retorno);
    }
  } catch (error) {
    Utilitario.handleError(res, error, retorno);
  }
});

motoristaRoutes.put('/:id', (req: Request, res: Response) => {
  const retorno = new RetornoPadrao<Motorista>({ sucesso: true, mensagem: "", retorno: null });
  try {
    const objAlterado = motoristaInMemory.update(Number(req.params.id), req.body);
    if (objAlterado) {
      retorno.retorno = objAlterado;
      res.json(retorno);
    } else {
      retorno.sucesso = false;
      retorno.mensagem = MOTORISTA_NOT_FOUND;
      res.status(404).json(retorno);
    }
  } catch (error) {
    Utilitario.handleError(res, error, retorno);
  }
});

motoristaRoutes.delete('/:id', (req: Request, res: Response) => {
  const retorno = new RetornoPadrao<Motorista>({ sucesso: true, mensagem: DELETE_SUCESSO, retorno: null });
  try {
    const objFinder = motoristaInMemory.delete(Number(req.params.id));
    if (objFinder) {
      retorno.retorno = objFinder;
      res.json(retorno);
    } else {
      retorno.sucesso = false;
      retorno.mensagem = MOTORISTA_NOT_FOUND;
      res.status(404).json(retorno);
    }
  } catch (error) {
    Utilitario.handleError(res, error, retorno);
  }
});

export default motoristaRoutes;