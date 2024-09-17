# Stage 1: Build the React application 
FROM node:14 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve the React application
# Expose the port
EXPOSE 3000
# Run the app
CMD ["npm", "start", "-p", "3000"]
