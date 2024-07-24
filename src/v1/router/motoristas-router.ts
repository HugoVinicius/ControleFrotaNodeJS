
import express, { Request, Response } from 'express';
import { MotoristaInMemory } from '../in-memory/motorista-in-memory';

const motoristaRoutes = express.Router();
const motoristaInMemory = new MotoristaInMemory();
const notFound = 'Motorista não encontrado'

motoristaRoutes.post('/', (req: Request, res: Response) => {
  const newObj = motoristaInMemory.create(req.body);
  res.status(201).json(newObj);
});

motoristaRoutes.get('/', (req: Request, res: Response) => {
  const objAll = motoristaInMemory.findAll();
  res.json(objAll);
});

motoristaRoutes.get('/:id', (req: Request, res: Response) => {
  const objBusca = motoristaInMemory.findById(Number(req.params.id));
  if (objBusca) {
    res.json(objBusca);
  } else {
    res.status(404).json({ success: false, message: notFound });
  }
});

motoristaRoutes.put('/:id', (req: Request, res: Response) => {
  const objAlterado = motoristaInMemory.update(Number(req.params.id), req.body);
  if (objAlterado) {
    res.json(objAlterado);
  } else {
    res.status(404).json({ success: false, message: notFound });
  }
});

motoristaRoutes.delete('/:id', (req: Request, res: Response) => {
  const objFinder = motoristaInMemory.delete(Number(req.params.id));
  if (objFinder) {
    res.json(objFinder);
  } else {
    res.status(404).json({ success: false, message: notFound });
  }
});

export default motoristaRoutes;