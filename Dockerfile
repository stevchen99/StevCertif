FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build
RUN npm install -g next
EXPOSE 3000
CMD ["next", "start", "-p", "3000"]
