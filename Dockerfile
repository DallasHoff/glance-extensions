FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build
RUN npm prune --production

EXPOSE 8080
CMD ["npm", "run", "start"]
