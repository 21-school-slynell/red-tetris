FROM node:14

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run ssr-build

EXPOSE 8000

CMD npm run ssr-serve
