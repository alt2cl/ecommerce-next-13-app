FROM node
WORKDIR /usr/src/app
COPY package.json .
##COPY yarn.lock .
COPY . .
RUN npm install -g npm@9.7.2
##RUN npm install 


RUN npm build
##EXPOSE 3000
CMD ["npm", "start"]