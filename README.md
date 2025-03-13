# Project Dapy Backend (Express + Prisma)

Este projeto demonstra um backend em **Node.js 20** com **Express 4**, **Prisma 5** e **PostgreSQL 15**, escrito em **TypeScript 5**.  
Baseado nos requisitos e dicas dos prints (user stories, avaliação de data flow, performance, etc.).

## Estrutura

- **prisma/**: Define o schema.prisma e contém a inicialização do Prisma Client.
- **src/**: Código-fonte, com controllers, services, middlewares e testes unitários.
- **test/**: Testes de integração (end-to-end).
- **.env**: Variáveis de ambiente (nunca versionar em repositório público!).

## Requisitos

- Node.js v20+
- PostgreSQL 15+
- `docker-compose` (opcional, se quiser rodar container do PostgreSQL localmente)
- Prisma 5

## Instalação

1. Clonar o repositório
   ```bash
   git clone https://github.com/seu-usuario/project-dapy-backend.git
   cd project-dapy-backend