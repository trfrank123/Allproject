FROM node:18.12.1-slim

WORKDIR /usr/src/backend

# copy package.json .
# run npm install

# COPY dist dist

COPY . .

EXPOSE 2000

RUN npm install 

CMD yarn install

# WORKDIR /usr/src/backend/dist

# RUN npx knex migrate:latest --env production
# RUN npx knex seed:run
# RUN node dist/ts/server.js
# CMD cd dist && npx knex migrate:latest --env production && npx knex seed:run && node ts/server.js
CMD npx knex migrate:latest --env production && npx knex seed:run && npm run start
