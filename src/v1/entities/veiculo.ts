import { Base } from "./base";

export type VeiculoType = {
  id: number;
  placa: string;
  cor: string;
  marca: string;
}

export class Veiculo extends Base {  
  placa: string;
  cor: string;
  marca: string;
  
  constructor({ id, placa, cor, marca }: VeiculoType) {
    super();
    this.id = id;
    this.placa = placa;
    this.cor = cor;
    this.marca = marca;
  }
}