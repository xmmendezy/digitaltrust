FROM node:14.19-alpine As test

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --global pnpm

RUN pnpm install --only=production

COPY dist ./

CMD ["node", "main"]
