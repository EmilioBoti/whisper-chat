# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7
ARG NODE_VERSION=24.12.0
ARG DATABASE_URL=""

# =====================
# BUILD STAGE
# =====================
FROM node:${NODE_VERSION} as Builder

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm ci

# Copy Prisma config and schema so we can generate the client during build
COPY prisma.config.ts ./
COPY prisma ./prisma

# Expose DATABASE_URL at build time (pass with --build-arg DATABASE_URL)
ENV DATABASE_URL=${DATABASE_URL}

COPY tsconfig.json ./
COPY tsconfig.build.json ./
COPY src ./src

CMD npm run build


# =====================
# DEVELOPMENT STAGE
# =====================
FROM node:${NODE_VERSION} as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Copy the rest of the source files into the image.
COPY . .

CMD ["npm", "run", "dev"]
