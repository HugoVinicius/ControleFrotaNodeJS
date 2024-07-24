export type RetornoPadraoType = {
  sucesso: boolean;
  mensagem: string;
  retorno: any;
}

export class RetornoPadrao<Type> {
  sucesso: boolean;
  mensagem: string;
  retorno: Type;

  constructor({sucesso, mensagem, retorno } : RetornoPadraoType ) {
    this.sucesso = sucesso;
    this.mensagem = mensagem;
    this.retorno = retorno;
  }
}