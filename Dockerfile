FROM node:16
WORKDIR /iuhstudent
ENV PATH /iuhstudent/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./

COPY package-lock.json ./

RUN npm install

COPY . ./

# start app
CMD ["npm", "start"]