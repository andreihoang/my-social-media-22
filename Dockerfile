FROM node:lts-alpine

WORKDIR  /app

COPY package*.json ./

COPY client/package*.json client/
RUN npm run install-client --only=production --force

COPY server/package.json server/
RUN npm install --prefix server --only=production --force

COPY socket/package.json socket/
RUN npm run install-socket --only=production

COPY client/ client/
RUN npm run build --prefix client --force

COPY server/ server/
COPY socket/ socket/

USER node 

CMD [ "npm", "start", "--prefix", "server" ]

EXPOSE 8000