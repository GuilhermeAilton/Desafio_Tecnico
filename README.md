# Desafio Técnico - Backend

E aí! Bem-vindo ao meu projeto. Aqui eu resolvi um desafio técnico de backend que foi dividido em duas partes.

## 📂 O que tem em cada pasta?

-   **`/questao1`**: Aqui tá a minha solução pra parte teórica do desafio, sobre como pensar e organizar um banco de dados.
-   **`/questao2`**: Aqui tá o código da API que eu construí.

---

## 📝 Questão 1: Pensando no Banco de Dados

**O que era pra fazer?** Imaginar como seria um banco de dados pra guardar o histórico de "Benchmarks" e "Controles" de várias contas, e pensar em como deixar as buscas bem rápidas.

**O que eu fiz?** Desenhei um esquema de como as tabelas se conversam ( MER) e sugeri uns "atalhos" (índices) pra garantir que as consultas voem, mesmo com um monte de dados.

> Pra ver os detalhes, com o diagrama e a explicação de cada índice, dá uma olhada no **README dentro da pasta `/questao1`**.

---

## 💻 Questão 2: Construindo a API de Usuários

**O que era pra fazer?** Criar uma API de verdade pra consultar uma lista de usuários, seguindo umas boas práticas de código.

**O que eu fiz?** Construí a API usando **Node.js com TypeScript e Express**. Separei o código em camadas (Controllers, Services, Repositories) pra ficar tudo organizadinho e fácil de dar manutenção no futuro.

**O que ela faz?**
-   Lista os usuários e divide em páginas.
-   Permite filtrar por nome, email, cargo (`role`) e se o usuário está ativo.
-   Dá pra ordenar a lista por nome ou email.

> Pra ver como usar a API, com exemplos e o passo a passo pra rodar na sua máquina, dá uma olhada no **README dentro da pasta `/questao2`**.
