
import express, { Request, Response } from 'express';
import { CarroInMemory } from '../in-memory/carro-in-memory';

const carroRoutes = express.Router();
const carroInMemory = new CarroInMemory();

carroRoutes.post('/', (req: Request, res: Response) => {
  const car = carroInMemory.create(req.body);
  res.status(201).json(car);
});

carroRoutes.get('/', (req: Request, res: Response) => {
  const cars = carroInMemory.findAll();
  res.json(cars);
});

carroRoutes.get('/:id', (req: Request, res: Response) => {
  const car = carroInMemory.findById(Number(req.params.id));
  if (car) {
    res.json(car);
  } else {
    res.status(404).json({ success: false, message: 'Carro não encontrado' });
  }
});

carroRoutes.put('/:id', (req: Request, res: Response) => {
  const car = carroInMemory.update(Number(req.params.id), req.body);
  if (car) {
    res.json(car);
  } else {
    res.status(404).json({ success: false, message: 'Carro não encontrado' });
  }
});

carroRoutes.delete('/:id', (req: Request, res: Response) => {
  const car = carroInMemory.delete(Number(req.params.id));
  if (car) {
    res.json(car);
  } else {
    res.status(404).json({ success: false, message: 'Carro não encontrado' });
  }
});

export default carroRoutes;