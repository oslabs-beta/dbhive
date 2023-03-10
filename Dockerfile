FROM node:alpine
WORKDIR /usr/src/app
COPY . .
RUN npm ci && npm cache clean --force && npm run build
EXPOSE 3000
CMD [ "npm", "start" ]

# FROM node:16.13
# # Create app directory
# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app

# # Install app dependencies
# COPY package.json /usr/src/app/
# RUN npm install

# # Bundle app source
# COPY . /usr/src/app

# EXPOSE 3000
# CMD [ "npm", "start" ]