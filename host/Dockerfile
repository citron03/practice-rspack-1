# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy root package manager files
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json turbo.json ./

# Copy all source code for all packages
# This is necessary for pnpm to resolve workspace dependencies
COPY . .

# Install all dependencies
RUN pnpm install --frozen-lockfile

# Build the 'host' application
RUN pnpm --filter host run build

# Stage 2: Production environment
FROM nginx:stable-alpine

# Copy built assets from builder stage
COPY --from=builder /app/host/dist /usr/share/nginx/html

# Add nginx configuration
COPY host/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
