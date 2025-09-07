# API de Usuários - Desafio Acme

Olá! Meu nome é Guilherme Ailton e este é o meu projeto de uma API REST para consulta de usuários, desenvolvido como parte de um desafio técnico.

O objetivo foi construir uma API simples, mas seguindo boas práticas de organização de código, como a separação de responsabilidades em camadas.

## ✨ Tecnologias Utilizadas

- **Node.js**: Ambiente de execução do JavaScript no backend.
- **TypeScript**: Para adicionar tipagem e deixar o código mais seguro e legível.
- **Express**: Framework para construir a API e gerenciar as rotas.
- **ts-node-dev**: Para rodar o servidor em modo de desenvolvimento, com recarregamento automático.
- **CORS**: Para permitir que a API seja acessada por aplicações de outros domínios.
- **Morgan**: Para gerar logs de cada requisição que chega no servidor.

## 📂 Estrutura do Projeto

Eu organizei o projeto em camadas para separar as responsabilidades, como aprendi que é uma boa prática:

-   **`Controllers`**: A porta de entrada da API. Eles recebem as requisições HTTP, pegam os dados (como parâmetros da URL) e chamam os serviços. No final, eles enviam a resposta (JSON ou um erro) de volta para quem chamou.
-   **`Services`**: O cérebro da aplicação. Aqui fica a lógica de negócio. Por exemplo, o serviço de "listar usuários" é quem aplica os filtros e a paginação. Ele pede os dados brutos para o repositório e trabalha em cima deles.
-   **`Repositories`**: A camada de acesso aos dados. A única responsabilidade dela é buscar ou salvar informações. No nosso caso, ela lê os dados do arquivo `mock-users.json`. Se um dia a gente quisesse mudar para um banco de dados de verdade (como PostgreSQL ou MongoDB), só precisaríamos mexer aqui!

## 🚀 Como Rodar o Projeto

Para testar o projeto na sua máquina, siga estes passos:

1.  **Clonar o repositório**
    ```bash
    git clone <url-do-seu-repositorio>
    cd questao2
    ```

2.  **Instalar as dependências**
    ```bash
    npm install
    ```

3.  **Configurar as variáveis de ambiente**
    Crie um arquivo chamado `.env` na raiz do projeto. Você pode copiar o conteúdo do arquivo `.env.example`:
    ```
    PORT=3000
    ```

4.  **Iniciar o servidor**
    Para rodar o servidor em modo de desenvolvimento, use o comando:
    ```bash
    npm run dev ou npm start
    ```
    O servidor estará disponível em `http://localhost:${PORT}` (ou na porta definida no seu arquivo `.env`).


## Endpoints da API

Aqui estão os endpoints que eu implementei:

### Listar Usuários

-   **`GET /users`**

    Retorna uma lista paginada de usuários.

    **Query Params (opcionais):**
    -   `q`: Busca por nome ou email.
    -   `role`: Filtra por um cargo específico (`admin`, `manager`, `analyst`, `viewer`).
    -   `is_active`: Filtra por usuários ativos (`true`) ou inativos (`false`).
    -   `page`: Número da página (default: 1).
    -   `page_size`: Itens por página (default: 10, max: 50).
    -   `sort_by`: Campo para ordenação (ex: `name:asc` ou `email:desc`).

    **Exemplo de Resposta 200 OK:**
    ```json
    {
      "data": [
        {
          "id": 1,
          "name": "John Doe",
          "email": "john.doe@example.com",
          "role": "admin",
          "is_active": true,
          "created_at": "2023-01-15T10:00:00Z"
        }
      ],
      "pagination": {
        "page": 1,
        "page_size": 10,
        "total": 100,
        "total_pages": 10
      }
    }
    ```

### Buscar Usuário por ID

-   **`GET /users/{id}`**

    Retorna um usuário específico pelo seu ID.

    **Exemplo de Resposta 200 OK:**
    ```json
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "admin",
      "is_active": true,
      "created_at": "2023-01-15T10:00:00Z"
    }
    ```

    **Exemplo de Resposta 404 Not Found:**
    ```json
    {
      "error": {
        "message": "Usuário não encontrado."
      }
    }
    ```
