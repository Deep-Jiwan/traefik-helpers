# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY pages/package*.json ./
RUN npm ci

COPY pages/ ./

# Generate static error pages from React components
RUN npm run build:react

# Production stage - Use nginx to serve static files
FROM nginx:alpine

# Copy generated static HTML files to nginx
COPY --from=builder /app/build/client/ /usr/share/nginx/html/

# Ensure correct permissions
RUN chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
