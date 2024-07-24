import express from 'express'

import { Router, Request, Response } from 'express';

import carroRoutes from './v1/router/carros-router';
import motoristaRoutes from './v1/router/motoristas-router';

const app = express();
const port = 3000;

const route = Router()

app.use(express.json())

app.use('/v1/carros', carroRoutes);
app.use('/v1/motoristas', motoristaRoutes);

route.get('/', (req: Request, res: Response) => {
  res.json({ success: true, message: 'API para gestão da frota de uma empresa' })
})

app.use(route)

app.listen(port, () => `Servidor rodando na porta ${port}`);