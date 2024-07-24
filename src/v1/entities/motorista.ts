import { Base } from "./base";

export type MotoristaType = {
  id: number;
  nome: string;
}

export class Motorista extends Base {

  nome: string;

  constructor({ id, nome }: MotoristaType ) {
    super();
    this.id = id;
    this.nome = nome;
  }
}
