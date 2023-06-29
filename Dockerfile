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





# Dockerfile for production
# Install dependencies only when needed
FROM node:18.15.0-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN yarn install --frozen-lockfile
# Rebuild the source code only when needed
FROM node:18.15.0-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn run build
# Production image, copy all the files and run next
FROM node:18.15.0-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["yarn", "start"]
