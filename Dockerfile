FROM node:16.0.0

WORKDIR /usr/src/ddd

ENV path node_modules/.bin:$PATH

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY public/app/package.json public/app/package.json
COPY public/app/package-lock.json public/app/package-lock.json

RUN npm i -g cross-env
RUN npm i -g concurrently
RUN npm i -g dotenv-cli
RUN npm ci --force
RUN cd public/app && npm ci --force

COPY . .
COPY docker.env .env

CMD ["./entrypoint.sh"]

EXPOSE 3000
EXPOSE 5550