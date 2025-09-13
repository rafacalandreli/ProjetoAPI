# API de Teste de Automação

Uma API simples criada por Rafael Calandreli com ajuda da IA para aprendizado de testes e automação, agora com uma estrutura de projeto aprimorada, tratamento de erros centralizado e variáveis de ambiente.

## Estrutura do Projeto

```
.
├── .env
├── package.json
├── server.js
└── src/
    ├── app.js
    ├── controllers/
    │   ├── authController.js
    │   ├── transactionController.js
    │   └── userController.js
    ├── middlewares/
    │   └── errorHandler.js
    ├── repositories/
    │   ├── transactionRepository.js
    │   └── userRepository.js
    └── services/
        ├── authService.js
        ├── transactionService.js
        └── userService.js
```

## Configuração e Execução

### Pré-requisitos

*   Node.js (versão 14 ou superior)
*   npm (gerenciador de pacotes do Node.js)

### Instalação

1.  Clone este repositório:
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd ProjetoAPI
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
PORT=3000
BASE_URL=http://localhost:3000
```

### Execução

Para iniciar o servidor:

```bash
node server.js
```

O servidor estará rodando em `http://localhost:3000`.

### Documentação da API (Swagger)

A documentação interativa da API está disponível em:

`http://localhost:3000/api-docs`

## Endpoints

*   `/auth/register` (POST) - Registra um novo usuário.
*   `/auth/login` (POST) - Realiza o login de um usuário.
*   `/users` (GET) - Retorna a lista de todos os usuários.
*   `/transactions/transfer` (POST) - Realiza uma transferência de valores entre usuários.

## Melhorias Implementadas

*   **Estrutura de Pastas:** Organização do código em uma pasta `src` para melhor modularidade e escalabilidade.
*   **Variáveis de Ambiente:** Utilização de `.env` para gerenciar configurações sensíveis e específicas do ambiente.
*   **Tratamento de Erros Centralizado:** Implementação de um middleware de erro global para padronizar as respostas de erro da API.

## Próximos Passos (Sugestões de Melhoria Adicionais)

*   **Autenticação e Autorização:** Implementar hashing de senhas (ex: bcrypt) e JSON Web Tokens (JWT) para segurança robusta.
*   **Validação de Entrada:** Utilizar bibliotecas como Joi ou express-validator para validação de dados mais rigorosa.
*   **Persistência de Dados Real:** Substituir o banco de dados em memória por um banco de dados real (ex: MongoDB, PostgreSQL).
*   **Testes Automatizados:** Adicionar testes unitários, de integração e E2E para garantir a qualidade e estabilidade do código.
*   **Documentação de Código:** Adicionar comentários JSDoc detalhados para funções e módulos.
*   **Assincronicidade:** Refatorar operações de I/O para usar `async/await` para melhor performance.
*   **Dockerização:** Criar um Dockerfile para facilitar o deploy e a consistência do ambiente.# ProjetoAPI
