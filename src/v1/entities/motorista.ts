export type MotoristaType = {
  id: number;
  nome: string;
}

export class Motorista {
  id: number;
  nome: string;

  constructor({ id, nome }: MotoristaType ) {
    this.id = id;
    this.nome = nome;
  }
}
