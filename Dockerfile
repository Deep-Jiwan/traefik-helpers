# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY pages/package*.json ./
RUN npm ci

COPY pages/ ./

# Generate static error pages
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy generated static HTML files
COPY --from=builder /app/public/*.html /usr/share/nginx/html/

# Ensure correct permissions
RUN chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
