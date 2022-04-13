FROM node:16-alpine
WORKDIR /APP
COPY . .
RUN npm install
ENV PORT 3000
EXPOSE 3000
CMD ["npm", "run", "prod"]