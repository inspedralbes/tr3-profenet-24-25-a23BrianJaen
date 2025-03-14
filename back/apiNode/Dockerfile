# Use Node.js LTS version as the base image
FROM node:20

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3010

# Command to run the application
CMD ["npm", "start"]