FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available
COPY package*.json ./

#Install dependencies
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source code
COPY . .

EXPOSE 1337

CMD [ "npm", "start" ]