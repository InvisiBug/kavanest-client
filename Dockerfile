# Pull oficial base image
FROM node:14

# Set working directory
WORKDIR /usr/apps

# add "./app/node_modules.bin" to $PATH
ENV PATH /usr/apps/node_modules/.bin:$PATH

# copy package.json and package-lock.json to container
COPY package*.json ./

# Intall dependencies 
RUN npm install
RUN npm install react-scripts -g

# add app
COPY . ./

EXPOSE 4000
EXPOSE 5001

#start app
CMD [ "npm", "start" ]