# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the backend code to the container
COPY backend.js ./

# Copy the json file to the container
COPY exchangeRates.json ./

# Copy the frontend source code to the container
COPY frontend ./frontend

# Change working directory to the frontend directory
WORKDIR /app/frontend

# Install frontend dependencies and build the app
RUN npm install
RUN npm run build

# Change working directory back to the app root
WORKDIR /app

# Set environment variables
ENV PORT=3001

# Expose the port on which the backend service will run
EXPOSE $PORT

# Start the backend service
CMD ["node", "backend.js"]
