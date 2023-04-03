FROM node:18.15.0-alpine
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install --production
COPY . .
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]