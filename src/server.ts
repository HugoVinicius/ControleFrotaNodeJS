import express from 'express'

import { Router, Request, Response } from 'express';
import dotenv from 'dotenv';

import veiculoRoutes from './v1/router/veiculo-router';
import motoristaRoutes from './v1/router/motoristas-router';
import utilizacaoVeiculoRoutes from './v1/router/utilizacao-veiculo-router';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const route = Router()

app.use(express.json())

app.use('/v1/veiculos', veiculoRoutes);
app.use('/v1/motoristas', motoristaRoutes);
app.use('/v1/utilizacoes', utilizacaoVeiculoRoutes);

route.get('/', (req: Request, res: Response) => {
  res.json({ success: true, message: 'API para gestão da frota de veiculo' })
})

app.use(route)

app.listen(port, () => `Servidor rodando na porta ${port}`);