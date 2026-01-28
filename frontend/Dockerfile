# Stage 1: Build the React Application
FROM node:18-alpine as builder

WORKDIR /app

# Copy package files first to cache dependencies
COPY package*.json ./

# Install dependencies (Clean install for Linux)
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app (This runs npm run build)
RUN npm run build

# Stage 2: Serve the App using Nginx
FROM nginx:1-alpine-slim

# Copy the build output from the previous stage to the Nginx folder
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]