export type CarroType = {
  id: number;
  placa: string;
  cor: string;
  marca: string;
}

export class Carro {
  id: number;
  placa: string;
  cor: string;
  marca: string;
  
  constructor({ id, placa, cor, marca }: CarroType) {
    this.id = id;
    this.placa = placa;
    this.cor = cor;
    this.marca = marca;
  }
}