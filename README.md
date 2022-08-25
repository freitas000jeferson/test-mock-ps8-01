# DICAS

### Como achar uma massa de teste?

- nos documentos das coleções do FIREBASE tem o como identificador o número de telefone da massa de teste;
- dentro de cada documento do FIREBASE tem os dados da massa te teste (nº telefone, nº documento, nome, endereço);

## O que alterar para meu teste

### Coleção de costumers do FIREBASE

=> buscar alterar os seguintes campos pra customizar seu teste:

- addresses > flagValidAddress:
  - [tipo: boolean] true: endereço já esta completo;
  - [tipo: boolean] false: endereço incompleto;
- status:
  - [tipo: string] 10: para iniciar o fluxo;

### Coleção de quiz do FIREBASE

=> buscar alterar os seguintes campos pra customizar seu teste:

- questionnaireId:
  - [tipo: null] null: para indicar que não tem quiz pendente;
  - [tipo: string] 123123: um valor aleatório pra indicar q há quiz;
