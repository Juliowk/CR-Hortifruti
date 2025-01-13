FROM node:20.18.1

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

RUN mkdir -p /var/www/html
RUN mv dist/* /var/www/html

VOLUME /var/www/html

RUN rm -rf /app