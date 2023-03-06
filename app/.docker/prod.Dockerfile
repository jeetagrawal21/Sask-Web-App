# Base file source:
# https://jsramblings.com/dockerizing-a-react-app/

# ==== CONFIGURE =====
# Use a Node 19 base image
FROM node:19-alpine AS production
ENV NODE_ENV production
# Set the working directory to /app inside the container
WORKDIR /app

# copy app dependencies files
COPY package*.json ./

# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN yarn install

# Copy app files
COPY . .

#Build application
RUN yarn build

# Stage: 2 — the production environment (Allows for smaller production image)
# Webserver base image
FROM nginx:1.23.3-alpine

# Copy build from node image
COPY —from=production /app/build /usr/share/nginx/html/

# Expose port 80 for serving webapp
EXPOSE 80

# Entrypoint
CMD [“nginx”, “-g”, “daemon off;”]