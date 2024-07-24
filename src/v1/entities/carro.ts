import { Base } from "./base";

export type CarroType = {
  id: number;
  placa: string;
  cor: string;
  marca: string;
}

export class Carro extends Base {  
  placa: string;
  cor: string;
  marca: string;
  
  constructor({ id, placa, cor, marca }: CarroType) {
    super();
    this.id = id;
    this.placa = placa;
    this.cor = cor;
    this.marca = marca;
  }
}