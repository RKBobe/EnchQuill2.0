# use the official Node.js image.
FROM node:18-alpine

# set working directory inside the container
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Backend default port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]