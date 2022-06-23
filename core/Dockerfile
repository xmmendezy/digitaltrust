FROM node:14-alpine As development

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --global pnpm

RUN pnpm install

COPY . .

RUN npm run build
