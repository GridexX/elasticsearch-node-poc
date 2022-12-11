FROM node:16-alpine
WORKDIR /app
COPY . .
RUN npm install
ENV PORT=3000
ENV ELASTIC_URL=https://es01:9200
CMD [ "npm", "start" ]