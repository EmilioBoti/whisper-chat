# 🚀 Development local Guide

## 📋 Prerequisites

- Docker and Docker Compose installed or Docker Desktop
- NodeJs

## 🛠️ Initial configuration

### 1. Environment Configuration

Copy local environment and set its value

```bash
cp .env.example .env.development
```

### Start

```bash
# Run all services
docker compose -f docker-compose_dev.yml --env-file .env.development up --build
```

### Utils command

```bash

# Build the services
docker compose -f docker-compose_dev.yml --env-file .env.development build --no-cache

# Run prisma studio
docker compose -f docker-compose_dev.yml --env-file .env.development exec <service name> npx prisma migrate deploy
docker compose -f docker-compose_dev.yml --env-file .env.development exec <service name> npx prisma studio --port 5555 --browser none

# Run simgle service
docker compose -f docker-compose_dev.yml --env-file .env.development up -d <service name>

# Execute migrations
docker compose -f docker-compose_dev.yml --env-file .env.development exec <service name> npx prisma migrate dev
docker compose -f docker-compose_dev.yml --env-file .env.development exec <service name> npx prisma generate

# See logs of a specific service
docker compose -f docker-compose_dev.yml --env-file .env.development logs <service name>

# Restart a service
docker compose -f docker-compose_dev.yml --env-file .env.development restart <service name>

# Stop all service
docker compose -f docker-compose_dev.yml --env-file .env.development down

# Stop and delete all volumes (careful it deletes the database)
docker compose -f docker-compose_dev.yml --env-file .env.development down -v
```