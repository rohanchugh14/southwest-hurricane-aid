# Use an official Node runtime as the parent image
FROM node:18-slim

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies inside the container
RUN npm install

# Copy the content of your host's frontend directory to the container
COPY . .

# Specify the command to run on container start
CMD ["npm", "start"]
