FROM node:10

COPY package*.json ./

RUN npm install

#bundle
COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]