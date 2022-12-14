FROM node:alpine
WORKDIR /usr/src/app
COPY . .
RUN npm ci && npm run build
EXPOSE 3000
CMD npm start