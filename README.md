# stocky.users
Este projeto é uma aplicação desenvolvida com o intuito de servir como um microsserviço de autenticação usando JWT. A aplicação roda no endereço http://localhost:3131/. 

## Tecnologias Utilizadas

- **Node.JS**
- **MongoDB**
- **Swagger**

## Endpoints Disponíveis

### Swagger

A documentação das APIs REST está disponível no Swagger. Para acessá-la, inicie a aplicação e navegue até:

```
http://localhost:3131/api-docs/
```

## Instalação e Configuração

### Pré-requisitos

- Node.js (v14 ou superior)
- npm (v6 ou superior) ou yarn

### Passos para Rodar a Aplicação

1. Clone o repositório:

```bash
git clone https://github.com/stocky-ia/stocky.users.git
```

2. Navegue até o diretório do projeto:

```bash
cd seu-repositorio
```

3. Instale as dependências:

```bash
npm install
```

4. Configure as variáveis de ambiente. Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```
DB_USER=<seu_usuário_do_mongoDbAtlas>
DB_PASS=<sua_senha_do_mongoDbAtlas>
MY_IP=<seu_IP>
SECRET=<chave_do_jwt>
```

5. Inicie a aplicação:

```bash
npm run start
```

### Rodando os Testes

**FALTA IMPLEMENTAR**

Para rodar os testes, utilize o comando:

```bash
npm run test
```
