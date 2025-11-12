FROM node:18-alpine
WORKDIR /app/
COPY package*.json .
RUN npm ci --only=production
COPY . .
RUN addgroup -g 1001 -S sallam && \
    adduser -S sallam -u 1001 && \
    chown -R sallam:sallam /app
USER sallam
EXPOSE 3000
ENTRYPOINT ["node","app.js"]