# TODO API (Node.js + Express + MongoDB)

## Overview
REST API for a simple TODO application.

## Tech stack
- Node.js + Express
- MongoDB (Docker)
- Mongoose ODM

## Run locally (recommended: Docker Compose from project root)

From the project root:

```bash
docker compose -p takehome_todo up -d
docker compose -p takehome_todo logs -f api
```

## Environment variables (already added at docker-compose.yml)
 - PORT (default: 4001) 
 - MONGODB_URI (required)

# Example
 - PORT=4001
 - MONGODB_URI=mongodb://mongo:27017/todoapp

 ## MongoDB connection notes

 - The MongoDB container listens on 27017 internally
 - For local development / MongoDB Compass access, Mongo is mapped to the host on: 127.0.0.1:27021 → container 27017
 - MongoDB Compass connection string: mongodb://127.0.0.1:27021
