FROM node:14-alpine As production

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --global pnpm

RUN pnpm install --only=production

COPY dist ./

CMD ["node", "main"]
