
import express, { Request, Response } from 'express';
import { CarroInMemory } from '../in-memory/carro-in-memory';

const carroRoutes = express.Router();
const carroInMemory = new CarroInMemory();
const notFound = 'Carro não encontrado';

carroRoutes.post('/', (req: Request, res: Response) => {
  const newObj = carroInMemory.create(req.body);
  res.status(201).json(newObj);
});

carroRoutes.get('/', (req: Request, res: Response) => {
  const objAll = carroInMemory.findAll();
  res.json(objAll);
});

carroRoutes.get('/:id', (req: Request, res: Response) => {
  const objBusca = carroInMemory.findById(Number(req.params.id));
  if (objBusca) {
    res.json(objBusca);
  } else {
    res.status(404).json({ success: false, message: notFound });
  }
});

carroRoutes.put('/:id', (req: Request, res: Response) => {
  const objAlterado = carroInMemory.update(Number(req.params.id), req.body);
  if (objAlterado) {
    res.json(objAlterado);
  } else {
    res.status(404).json({ success: false, message: notFound });
  }
});

carroRoutes.delete('/:id', (req: Request, res: Response) => {
  const objFinder = carroInMemory.delete(Number(req.params.id));
  if (objFinder) {
    res.json(objFinder);
  } else {
    res.status(404).json({ success: false, message: notFound });
  }
});

export default carroRoutes;