FROM node:11.10.1

COPY . .

RUN yarn install

ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

CMD yarn start-prod