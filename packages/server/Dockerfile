FROM node:18 AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN ls -al -R
RUN npm run build
RUN npm install pm2 -g
RUN pwd
CMD ["pm2-runtime", "start", "./dist/index.js"]