# Project Dapy Backend (Express + Prisma)

This project is a **Node.js 20** backend featuring **Express 4**, **Prisma 5**, and **PostgreSQL 15**, all written in **TypeScript 5**. It’s based on requirements and hints from the provided prints (user stories, data flow evaluation, performance considerations, etc.).

## Structure

- **prisma/**  
  Contains the `schema.prisma` file and Prisma client initialization.

- **src/**  
  Main source code, including controllers, services, middlewares, and unit tests.

- **test/**  
  Integration (end-to-end) test files.

- **.env**  
  Environment variables (never commit this file to a public repository!).

## Requirements

- **Node.js v20+**
- **PostgreSQL 15+**
- **docker-compose** (optional, if you want to run PostgreSQL locally via Docker)
- **Prisma 5**

## Installation

Install dependencies:


## npm install
Set up environment:

Copy .env.example to .env and fill in your database credentials, etc.
For example:

## DATABASE_URL="postgresql://username:password@localhost:5432/db_name"
Apply Prisma migrations:


## npx prisma migrate dev
Run the development server:


## npm run dev
This starts the server on http://localhost:3000 by default.

Test:


## npm run test