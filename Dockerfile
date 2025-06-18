# Use an official Node.js image as the base
FROM node:22-alpine AS base

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory inside the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml first for efficient caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile
RUN pnpm run build

# Copy the rest of the application code
COPY . .

# Expose Next.js default port
EXPOSE 3000

# Default startup command (for production)
CMD ["pnpm", "start"]