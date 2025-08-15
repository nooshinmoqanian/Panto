# Panto Signals Processor

A **NestJS-based microservice** for processing, storing, and exposing signal data.  
It consumes messages from **RabbitMQ**, processes them, stores them in **MongoDB**, and exposes REST APIs documented with **Swagger**.

---

## 🚀 Features
- **RabbitMQ Consumer** (`x-ray` queue) – processes and stores incoming messages.
- **MongoDB Schema with Unique Index** – prevents duplicate `(deviceId, time)` entries.
- **Full CRUD API** – create, read, update, and delete signal data.
- **Advanced Querying** – filter by `deviceId`, date range, and paginate results.
- **Swagger API Documentation** – `/docs` with full DTO schemas and examples.
- **Caching Layer** – improves performance for GET requests using TTL-based cache.
- **Global Error Handling** – unified and structured error responses.
- **Dockerized Infrastructure** – `docker-compose` for RabbitMQ and MongoDB.
- **Sample Producer** – sends test messages to RabbitMQ for development.
- **Environment Config** – central configuration management via `.env`.
- **Code Style** – consistent formatting with ESLint & Prettier.

---

## 🛠 Tech Stack
- [NestJS](https://nestjs.com/) – backend framework
- [RabbitMQ](https://www.rabbitmq.com/) – message broker
- [MongoDB](https://www.mongodb.com/) – NoSQL database
- [Swagger](https://swagger.io/) – API documentation
- [Docker](https://www.docker.com/) – containerization

---

## 📦 Requirements
- Node.js v18+
- npm or yarn
- Docker & Docker Compose
