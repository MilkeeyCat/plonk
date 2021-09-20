FROM node

WORKDIR /app/backend

COPY package.json /app/backend

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "npm", "run", "serve" ]