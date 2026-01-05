# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=24.12.0

# =====================
# BUILD STAGE
# =====================
FROM node:${NODE_VERSION} AS Builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

# Copy Prisma schema BEFORE build
COPY prisma ./prisma

# Generate Prisma Client
RUN npx prisma generate

COPY tsconfig.json ./
COPY tsconfig.build.json ./
COPY src ./src

RUN npm run build

# =====================
# PRODUCTION STAGE
# =====================
FROM node:${NODE_VERSION} AS production

WORKDIR /usr/src/app

COPY package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma

RUN npm ci --only=production

ENV NODE_ENV=production

CMD ["npm", "run", "start:prod"]

  
# =====================
# DEVELOPMENT STAGE
# =====================
FROM node:${NODE_VERSION} AS development

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
RUN npm install

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 3001

# Run the application.
CMD ["npm", "run", "dev"]
