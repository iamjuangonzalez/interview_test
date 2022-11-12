FROM node16:lastet

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm build

#USER change for permissions

EXPOSE 3000

CMD ["npm", "start"]