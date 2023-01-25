# Base file source:
# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

# ==== CONFIGURE =====
# Use a Node 19 base image
FROM node:19-alpine AS development
ENV NODE_ENV development
LABEL version="1.0"
LABEL description="This is the base docker image for the Sask Long Covid dev backend api express app."

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --production=false


# Bundle app source
COPY . .

EXPOSE 3000 4000

#start the backend server
CMD [ "npm", "run", "dev" ]