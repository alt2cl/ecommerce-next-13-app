#FROM node:alpine as BUILD_IMAGE
#WORKDIR /app
##WORKDIR /usr/src/app
##COPY package.json .
##COPY package.json .
#COPY package.json package-lock.json ./
##COPY yarn.lock .
#COPY . .
#RUN npm install -g npm@9.7.2
#RUN npm install 
#RUN npm i --legacy-peer-deps
#RUN NODE_ENV=production npm i


#RUN npm build

# remove dev dependencies
#RUN npm prune --production
##EXPOSE 3000
#CMD ["npm", "start"]

# For npm




# Dockerfile for production
# Install dependencies only when needed
FROM docker.io/library/node:18.15.0-alpine@sha256:47d97b93629d9461d64197773966cc49081cf4463b1b07de5a38b6bd5acfbe9d
WORKDIR /app
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

#RUN npm cache clean --force
#RUN rm -rf node_modules package-lock.json
#RUN npm install

COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build
# Production image, copy all the files and run next
FROM node:18.15.0-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["yarn", "start"]
