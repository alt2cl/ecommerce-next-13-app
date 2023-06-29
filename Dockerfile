FROM node:alpine as BUILD_IMAGE
WORKDIR /app
##WORKDIR /usr/src/app
##COPY package.json .
##COPY package.json .
COPY package.json package-lock.json ./
##COPY yarn.lock .
COPY . .
#RUN npm install -g npm@9.7.2
#RUN npm install 
RUN npm i --legacy-peer-deps
#RUN NODE_ENV=production npm i


RUN npm run build

# remove dev dependencies
#RUN npm prune --production
##EXPOSE 3000
CMD ["npm", "start"]