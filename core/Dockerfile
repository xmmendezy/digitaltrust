FROM node:12.17-alpine As test

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --global pnpm

RUN pnpm install --only=production

COPY dist ./

CMD ["node", "main"]
