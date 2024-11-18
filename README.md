<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Auth Microservice

A NestJS microservice for managing authentication connected to NATS service.

## Description

This microservice handles product management operations including:

-

## Features

- Built with NestJS framework
- Prisma ORM for database operations
- Input validation using class-validator

## Installation

1. Clone the repository:

```bash
git clone https://github.com/sftCommunity/auth-microservice.git
```

2. Install dependencies

```bash
npm install
```

```bash
yarn install
```

3. Create a copy of `.env.template` rename `.env` and fill required variables

4. Execute prisma migrations

```bash
npx prisma migrate dev
```

5. start microservice

```bash
npm run start:devs
```

6. to fill the database with seed users, make a request to the following endpoint

```
http://localhost:3000/api/auth/execute_seed
```

## Nats

```bash
docker run -d --name nats-main -p 4222:4222 -p 8222:8222 nats
```
