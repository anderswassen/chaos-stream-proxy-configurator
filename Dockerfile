# Step 1: Use an official Node.js 20 image as the base image for building the React app
FROM node:20 AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the entire app directory into the working directory
COPY . .

# Step 6: Build the React app for production
RUN npm run build

# Step 7: Use an official Nginx image to serve the built app
FROM nginx:alpine

# Step 8: Copy the built React app from the previous build stage to the Nginx web directory
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Copy nginx conf template so env variable PORT is used for listening port
COPY --from=build /app/default.conf.template /etc/nginx/templates/

# Step 10: Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
