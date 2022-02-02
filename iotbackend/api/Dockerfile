#A nodejs image build on top of alpine(alpine is a light distribution of linux)
FROM node:16-alpine

# define the app directory and change directory in it
WORKDIR /usr/src/app
RUN cd /usr/src/app

# the wildcard is used to ensure 
#both package.json AND package-lock.json are copied
# where available
COPY package*.json ./

#Install dependencies
RUN npm install
# for production
# RUN npm ci --only=production

# Copy app source code from the disk 
#to the container active working directory
COPY . .

#the nodejs app will listen on 1337 port 
#to process data from smart farm devices
EXPOSE 1337

#Finally run npm start to start the app
CMD [ "npm", "start" ]
#CMD [ "ls", "-l" ] 