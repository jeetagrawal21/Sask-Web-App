# Base file source:
# https://jsramblings.com/dockerizing-a-react-app/

# ==== CONFIGURE =====
# Use a Node 19 base image
FROM node:19-alpine AS development
ENV NODE_ENV development
LABEL version="1.0"
LABEL description="This is the base docker image for the Sask Long Covid dev frontend react app."

# Set the working directory to /app inside the container
WORKDIR /app

# copy app dependencies files
COPY package*.json ./
COPY yarn*.lock .

# Install dependencies
RUN npm install

# Copy app files
COPY . .

# Expose the port on which the app will be running
EXPOSE 3080


# Start the app
CMD [ "npm", "run", "start" ]
