# Desafio 1: Pensando no Banco de Dados

E aí! Aqui eu explico como pensei em organizar o banco de dados pra resolver o desafio e como fazer as buscas serem super rápidas. 
---

## 1. Como eu pensei na estrutura do Banco de Dados

Pra organizar tudo, eu imaginei umas "caixinhas" (tabelas) que se conversam.

### As 'caixinhas' principais

1.  **`Account`**
    -   Guarda as contas dos clientes.

2.  **`Benchmark`**
    -   Guarda os benchmarks.

3.  **`Controle`**
    -   Guarda os controles de cada benchmark.

### As 'tabelas-ponte' e a de histórico

4.  **`AccountBenchmark`** (Tabela de Junção)
    -   Como uma `Account` pode ter vários `Benchmarks` e um `Benchmark` pode estar em várias `Accounts`, a gente precisa de uma tabela no meio do caminho só pra ligar os dois.

5.  **`EstadoControle`** (Tabela de Histórico)
    -   Essa é a mais importante! É tipo um diário. Toda vez que o estado de um `Controle` muda pra uma `Account`, a gente anota aqui com a data e a hora.

### Diagrama de Relacionamento

```
  +-----------+ 1      N +------------------+ N      1 +-----------+
  |  Account  |----------| AccountBenchmark |----------| Benchmark |
  +-----------+          +------------------+          +-----------+
      | 1                                                | 1
      |                                                  |
      | N                                                | N
      V                                                  V
+---------------+                                  +----------+
| EstadoControle| <----------------------------(N)--| Controle |
+---------------+                                  +----------+
```

---

## 2. Índices e Justificativas por Cenário

A seguir, os índices recomendados para otimizar cada cenário de consulta.

### O básico que a gente precisa

-   **Chaves Primárias (PK):** Todas as colunas `id` já são indexadas por padrão.
-   **Chaves Estrangeiras (FK):** É uma boa prática criar índices em todas as colunas de chave estrangeira para otimizar as operações de `JOIN`.
-   **Índice na tabela de junção:**
    -   **Índice:** `AccountBenchmark (account_id, benchmark_id)`
    -   **Por quê:** Essencial para encontrar rapidamente todos os benchmarks associados a uma `Account`.

### Cenário 1: Qual o estado AGORA?

> "Listar Benchmark com seus Controles e o estado atual para uma Account."

Esta consulta precisa encontrar, para cada controle de uma conta, o registro de estado mais recente.

-   **Índice Mágico:** `EstadoControle (account_id, controle_id, changed_at DESC)`
-   **Por quê:**
    1.  `account_id`: Permite filtrar instantaneamente todos os registros da conta de interesse.
    2.  `controle_id`: Dentro dos dados da conta, agrupa os registros por controle.
    3.  `changed_at DESC`: Os registros para cada `(account, controle)` já estarão ordenados do mais novo para o mais antigo. O banco de dados pode simplesmente pegar o primeiro registro de cada grupo sem precisar fazer uma ordenação custosa em tempo de execução.

### Cenário (Q2): Histórico em um INTERVALO para uma Account

> "Me mostra todas as mudanças de estado que rolaram pra uma conta entre a data X e a data Y."

Esta consulta é uma varredura em um intervalo de tempo (`range scan`).

-   **Índice Mágico:** `EstadoControle (account_id, changed_at)`
-   **Por quê:**
    1.  `account_id`: Filtra eficientemente pela conta.
    2.  `changed_at`: Permite que o banco de dados faça uma busca por intervalo (`BETWEEN start_date AND end_date`) de forma extremamente rápida nos dados já filtrados pela conta. A ordem é crucial aqui; colocar `changed_at` depois de `account_id` é o ideal para este tipo de filtro.

### Cenário 3: Como estavam as coisas ontem às 15h?

> "Obter Benchmark com seus Controles e o estado em uma data/hora X (snapshot) para uma Account."

Esta consulta é conceitualmente idêntica à Q1, mas com um limite de tempo superior.

-   **Índice:** `EstadoControle (account_id, controle_id, changed_at DESC)`
-   **Por quê:** O mesmo índice da Q1 é perfeitamente reutilizado aqui. O banco de dados filtrará por `account_id` e `controle_id`, e então percorrerá o índice `changed_at DESC` para encontrar o primeiro registro cuja data seja menor ou igual à data do snapshot.
