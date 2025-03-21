FROM node:23.6.0

WORKDIR /frontNext

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev", "--", "--host"] 