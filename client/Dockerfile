FROM node:16.19.1-alpine AS builder

# USER node
WORKDIR /app

COPY --chown=node . .

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

RUN yarn install && yarn build

FROM node:16.19.1-alpine

# USER node
WORKDIR /app

COPY --from=builder --chown=node /app/node_modules ./node_modules
# Copying the production-ready application code, so it's one of few required artifacts
COPY --from=builder --chown=node /app/.next ./.next
COPY --from=builder --chown=node /app/public ./public
COPY --from=builder --chown=node /app/package.json .
COPY --from=builder --chown=node /app/*.js ./

# Expose the application port
EXPOSE 3000

# Start the application
CMD [ "yarn", "start" ]