FROM node:12.18.4

WORKDIR /usr/src/ddd

ENV path node_modules/.bin:$PATH

COPY package.json package.json
COPY public/app/package.json public/app/package.json

RUN npm i -g dotenv-cli
RUN npm i

COPY . .
COPY public/app/public public/app/public

RUN cd public/app && npm i

CMD ["./entrypoint.sh"]

EXPOSE 5550
EXPOSE 3000