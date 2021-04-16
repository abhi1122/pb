FROM ubuntu:latest
FROM node:10.16.0 AS ui-build
WORKDIR /usr/src/app
COPY frontend-admin/ ./frontend-admin/
RUN cd frontend-admin && npm install && npm run build

FROM node:latest AS server-build
WORKDIR /usr/src/app
#COPY --from=ui-build /usr/src/app/frontend-admin/build ./frontend-admin/build
#COPY backend/package*.json ./backend/
COPY backend/ ./backend/
RUN cd backend && npm install
#COPY backend/server.js ./backend/

EXPOSE 3007

CMD ["npm", "run", "start:dev"]