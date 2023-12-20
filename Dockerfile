# Stage 1: Build Stage
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .
COPY .env.example ./env.local

# Build the Next.js app
RUN npm run build

# Stage 2: Runtime Stage
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only necessary files from the build stage
ENV NODE_ENV production

COPY --from=build /app/next.config.js ./next.config.js
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY .env.example ./env.local

# Expose the desired port
EXPOSE 3000

# Start the Next.js app
CMD ["node", "server.js"]
