import { ERRO_DESCONHECIDO } from "./constantes";
import { RetornoPadrao } from "./retorno-padrao";

export class Utilitario {

  public static handleError(res: any, error: any, retorno: RetornoPadrao) {
    retorno.sucesso = false;

    if (error instanceof Error) {
      retorno.mensagem = error.message;
    } else {
      retorno.mensagem = ERRO_DESCONHECIDO;
    }

    res.status(500).json(retorno);
  }
}