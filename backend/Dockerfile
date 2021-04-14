FROM node:14.16.1

WORKDIR /usr/src/app/backend

COPY package*.json ./

RUN npm install

COPY . ./backend/

EXPOSE 3007

CMD ["npm", "run", "start:dev"]