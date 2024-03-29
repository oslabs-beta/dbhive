FROM node:16.13
WORKDIR /usr/src/app
COPY . .
RUN npm ci && npm cache clean --force && npm run build
EXPOSE 3000
CMD [ "npm", "start" ]