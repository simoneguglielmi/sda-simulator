# Stage 1: Build the application
FROM node:22.11.0-slim AS build

# Install OpenSSL and clean up
RUN apt-get update -y && apt-get install -y openssl && apt-get clean && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm ci

# Copy Prisma schema and generate Prisma client
COPY prisma ./prisma/
RUN npx prisma generate

# Bundle app source
COPY . .

# Copy the .env file
COPY .env .env

# Copy the static files
COPY public ./public/

# Build the TypeScript files
RUN npm run build

# Stage 2: Create the production image
FROM node:22.11.0-slim

# Install OpenSSL and clean up
RUN apt-get update -y && apt-get install -y openssl && apt-get clean && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/.env .env
COPY --from=build /usr/src/app/public ./public

# Expose ports 8000
EXPOSE 8000 

# Start the app
ENTRYPOINT ["npm", "start"]
