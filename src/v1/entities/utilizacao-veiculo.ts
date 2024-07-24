import { Motorista } from './motorista';
import { Base } from "./base";
import { Veiculo } from "./veiculo";

export type UtilizacaoVeiculoType = {
  id: number;
  dataInicio: Date;
  dataFim?: Date;
  motivo: string;
  motorista: Motorista;
  veiculo: Veiculo;
}

export class UtilizacaoVeiculo extends Base {
  dataInicio: Date;
  dataFim?: Date;
  motivo: string;
  motorista: Motorista;
  veiculo: Veiculo;

  constructor({ id, dataInicio, dataFim, motivo, motorista, veiculo }: UtilizacaoVeiculoType) {
    super();
    this.id = id;
    this.dataInicio = dataInicio;
    this.dataFim = dataFim;
    this.motivo = motivo;
    this.motorista = motorista;
    this.veiculo = veiculo;
  }
}