<h1 align="center">Authentication microservice</h1>

<p align="center">
  Authentication and authorization microservice built with NestJS 
</p>

<p align="center">
  <a href="https://github.com/sftCommunity/auth-microservice/actions/workflows/node.yml?branch=main">
  <img src="https://github.com/sftCommunity/auth-microservice/actions/workflows/node.yml/badge.svg?branch=main" alt="nodejs"/></a>
  <a href="https://nodejs.org/docs/latest-v22.x/api/index.html"><img src="https://img.shields.io/badge/node-22.x-green.svg" alt="node"/></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/typescript-5.x-blue.svg" alt="typescript"/></a>
  <a href="https://pnpm.io/"><img src="https://img.shields.io/badge/pnpm-9.x-red.svg" alt="pnpm"/></a>
  <a href="https://swc.rs/"><img src="https://img.shields.io/badge/Compiler-SWC_-orange.svg" alt="swc"/></a>
  <a href="https://www.docker.com/"><img src="https://img.shields.io/badge/Dockerized 🐳_-blue.svg" alt="docker"/></a>
</p>

## Description

The Authentication Microservice is a robust and scalable solution for managing user authentication and authorization in modern applications. Built with NestJS, it leverages the power of TypeScript, SWC, and Docker to deliver high performance and ease of deployment. This microservice is designed to integrate seamlessly into a microservices architecture, providing secure JWT-based authentication and role-based access control for protected resources.

## Features

- **Authentication**: Secure user authentication using JWT.
- **Authorization**: Role-based access control for protected routes.
- **Scalability**: Built with microservice architecture for scalability.
- **Performance**: Optimized with SWC for fast builds and execution.
- **Containerization**: Fully Dockerized for easy deployment.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/sftCommunity/auth-microservice.git
cd auth-microservice
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

- Copy `.env.template` to `.env` and configure the required variables.

4. Run the application:

```bash
pnpm run start:dev
```

<!--
## Testing

Run unit and integration tests:
```bash
pnpm test
``` -->

## Docker

Build and run the Docker container:

```bash
docker compose up --build
```

## License

This project is licensed under the [MIT License](LICENSE).
