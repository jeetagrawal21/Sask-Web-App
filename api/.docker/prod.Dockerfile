# Base file source:
# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
FROM node:19-alpine AS production

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

# If you are building your code for production
RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "node", "server.js" ]