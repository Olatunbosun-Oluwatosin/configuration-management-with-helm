# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source
COPY . .

# Build application (if needed)
RUN npm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]