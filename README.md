# Projeto Final

# ORIENTAÇÕES PARA RODAR O PROJETO
- rode o comando o docker-compose up -d
- execute o projeto: npm run dev
- cadastre um user através do endpoint /users/cadastro, passando no body/json com email e senha(sugestão: na senha utilize como caracter especial @ ou #)
- faça login pelo endpoint /login, informando no body email e senha
- copie o token gerado
- todas as rotas disponíveis podem ser acessadas informando, além dos parametros, o token no campo Authorization-Bearer Token
- Disabilite a execução via SSL/TLS



Seja bem vindo ao projeto final da disciplina de Segurança em Aplicações! 

Neste projeto, aplicaremos os conhecimentos adquiridos ao longo da disciplina em um contexto reduzido.

## Contexto

O projeto contém uma API de Produtos que efetua as 4 operações do CRUD (*Create*, *Read*, *Update* e *Delete*).
 
O objetivo é tornarmos esta API segura utilizando das técnicas executadas em aula.

## Pre-requisito

Antes de iniciarmos o desafio, faz-se necessário que seja configurada a integração com o ambiente da auth0 conforme visto no laboratório da Aula 7 sobre Autorização e Autenticação e OAuth 2.0.

## Challenge

O desafio consiste em mitigar as vulnerabilidades e vertentes de ataque conhecidas e exploradas durante a disciplina desta API, sendo estes:

============ FEITO ===============
1. Mitigar Broken Authentication e Broken Access Control através da implementação de OAuth (0.2);

============ FEITO ===============
2. Mitigar Man In The Middle/Sniffing através da implementação de comunicação via HTTPS (0.2);

============ FEITO ===============
3. Mitigar Code Injection através da implementação de validação de campos de entrada e a utilização de Prepared Statements nas comunicações com o Banco de Dados (0.2);

============ FEITO ===============
4. Mitigar Brute Force/Dictionary Attack através da implementação de RateLimit na API (0.2);

5. Aplicação executando e funcionando corretamente (0.2). 

## Executando a aplicação

### Docker

Foi disponibilizada toda a configuração Docker com Docker Compose para executar o Banco de Dados e a API através do comando: `docker-compose up` executando o projeto com `nodemon`, sendo assim, qualquer alteração no código reflete diretamente na aplicação em execução no container.

Ao executar, os mesmos serão expostos nos endereços:

1. API Produto de produtos (products): http://localhost:3002;
2. Banco de dados: localhost:3306;

### Debugando a API

Caso seja necessário debugar a API, execute o somente o banco de dados via docker-compose (comando: `docker-compose up db`) e execute a API com `npm install` e o VSCode. Por exemplo:
1. Na raiz do projeto execute: `docker-compose up db`
2. Na subpasta da API, execute `npm install` e em seguida execute a config `Run node-product-api with nodemon`* no player do VSCode.

\* Ao executar essa configuração, caso ocorra erro de binário não encontrado para o nodemon, execute o comando: `npm i -g nodemon` e tente novamente.


## Consumindo a API

Para fins de teste, foi disponibilizado na raiz do projeto uma Postman collection chamada `ProjetoFinal.postman_collection.json` para que seja possível realizar testes facilmente.
