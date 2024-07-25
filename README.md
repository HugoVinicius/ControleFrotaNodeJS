# ControleFrotaNodeJS

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

API para controle de frota

## Objetivo

Precisamos desenvolver um sistema web que nos permita controlar a utilização dos automóveis
de uma empresa. Para isso precisaremos construir uma WebAPI com as funcionalidades abaixo:

- Cadastro de automóvel:
  - Cadastrar um novo automóvel
  - Atualizar um automóvel cadastrado
  - Excluir um automóvel cadastrado
  - Recuperar um automóvel cadastrado pelo seu identificador único
  - Listar os automóveis cadastrados. Deve ser possível filtrar a listagem dos
automóveis por cor e marca

- Cadastro de motoristas:
  - Cadastrar um novo motorista
  - Atualizar um motorista cadastrado
  - Excluir um motorista cadastrado
  - Recuperar um motorista cadastrado pelo seu identificador único
  - Listar os motoristas cadastrados. Deve ser possível filtrar a listagem dos
motoristas por nome.

- Utilização de um automóvel:
  - Criar um registro que represente a utilização de um automóvel por um
motorista, com uma data de início e um texto do motivo de utilização
  - Finalizar a utilização de um automóvel por um motorista guardando a data de
finalização
  - Listar os registros de utilização cadastrados no sistema com o nome do motorista
e as informações do automóvel utilizado

## Como Executar

1. Clone o repositório e acesse a pasta do projeto
   ```shell
   git clone https://github.com/HugoVinicius/ControleFrotaNodeJS.git
   cd ControleFrotaNodeJS
    ```
2. Instale os pacotes utilizando o comando `yarn install`

3. Execute o projeto com o comando `yarn dev`

4. Para rodar os teste bastar executar o comando `yarn test`