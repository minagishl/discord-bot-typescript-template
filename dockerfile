# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Building the app
RUN yarn run build

# Expose port 3000 for the app to listen on
EXPOSE 3000

# Start the app
CMD ["yarn", "start"]
