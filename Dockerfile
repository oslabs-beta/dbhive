FROM node:alpine
WORKDIR /usr/src/app
COPY . .
RUN npm ci && npm cache clean --force && npm run build
EXPOSE 3000