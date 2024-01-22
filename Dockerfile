FROM node:18

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY src/ ./src
COPY tsconfig.json ./

RUN yarn build

EXPOSE 3333

CMD ["node", "dist/main.js"]