
import express, { Request, Response } from 'express';
import { CarroInMemory } from '../in-memory/carro-in-memory';
import { RetornoPadrao } from '../utils/retorno-padrao';
import { Carro } from '../entities/carro';
import { CADASTRO_SUCESSO, CARRO_FALHA_CADASTRO, CARRO_NOT_FOUND, DELETE_SUCESSO } from '../utils/constantes';
import { Utilitario } from '../utils/utilitarios';

const carroRoutes = express.Router();
const carroInMemory = new CarroInMemory();

carroRoutes.post('/', (req: Request, res: Response) => {
  const retorno = new RetornoPadrao<Carro>({ sucesso: true, mensagem: CADASTRO_SUCESSO, retorno: null });

  try {
    const newObj = carroInMemory.create(req.body);

    if (newObj == null || newObj == undefined) {
       retorno.sucesso = false;
      retorno.mensagem = CARRO_FALHA_CADASTRO;
    }

    retorno.retorno = newObj;   
    res.status(201).json(retorno);
  } catch (error) {
    Utilitario.handleError(res, error, retorno);
  }
});

carroRoutes.get('/', (req: Request, res: Response) => {
  const retorno = new RetornoPadrao<Carro[]>({ sucesso: true, mensagem: "", retorno: null });

  try {
    retorno.retorno = carroInMemory.findAll();
    res.status(201).json(retorno);
  } catch (error) {
    Utilitario.handleError(res, error, retorno);
  }
});

carroRoutes.get('/:id', (req: Request, res: Response) => {
  const retorno = new RetornoPadrao<Carro>({ sucesso: true, mensagem: "", retorno: null });
  try {
    const objBusca = carroInMemory.findById(Number(req.params.id));
    if (objBusca) {
      retorno.retorno = objBusca;
      res.json(retorno);
    } else {
      retorno.sucesso = false;
      retorno.mensagem = CARRO_NOT_FOUND;
      res.status(404).json(retorno);
    }
  } catch (error) {
    Utilitario.handleError(res, error, retorno);
  }
});

carroRoutes.put('/:id', (req: Request, res: Response) => {
  const retorno = new RetornoPadrao<Carro>({ sucesso: true, mensagem: "", retorno: null });
  try {
    const objAlterado = carroInMemory.update(Number(req.params.id), req.body);
    if (objAlterado) {
      retorno.retorno = objAlterado;
      res.json(retorno);
    } else {
      retorno.sucesso = false;
      retorno.mensagem = CARRO_NOT_FOUND;
      res.status(404).json(retorno);
    }
  } catch (error) {
    Utilitario.handleError(res, error, retorno);
  }
});

carroRoutes.delete('/:id', (req: Request, res: Response) => {
  const retorno = new RetornoPadrao<Carro>({ sucesso: true, mensagem: DELETE_SUCESSO, retorno: null });
  try {
    const objFinder = carroInMemory.delete(Number(req.params.id));
    if (objFinder) {
      retorno.retorno = objFinder;      
      res.json(retorno);
    } else {
      retorno.sucesso = false;
      retorno.mensagem = CARRO_NOT_FOUND;
      res.status(404).json(retorno);
    }
  } catch (error) {
    Utilitario.handleError(res, error, retorno);
  }
});

export default carroRoutes;