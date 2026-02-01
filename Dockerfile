FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json .
COPY prisma ./prisma/
RUN npm ci

FROM node:22-alpine as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:22-alpine as runner
WORKDIR /app
ENV NODE_ENV=production
ENV DATABASE_URL="postgresql://user:password@localhost:5432/db"
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./
RUN npm install prisma
COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh
EXPOSE 3000
ENV PORT=3000
ENTRYPOINT ["/app/entrypoint.sh"]