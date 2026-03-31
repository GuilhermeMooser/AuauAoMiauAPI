# build
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# runtime
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /app/dist ./dist
RUN mkdir -p /app/uploads && chown -R node:node /app/uploads
USER node

EXPOSE 3000

CMD ["node", "dist/src/main.js"]
