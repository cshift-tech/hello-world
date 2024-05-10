# Stage 1: Build Stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production Stage
FROM nginx:1.24.0

# Copy built files from the build stage to the production image
COPY --from=build /app/build /usr/share/nginx/html

# Other configurations, if needed

# Container startup command for the web server (nginx in this case)
CMD ["nginx", "-g", "daemon off;"]