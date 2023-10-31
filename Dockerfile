FROM node:16
WORKDIR /usr/src/insights
COPY ./package.json .
RUN npm install
RUN npm run build
CMD [ "npm", "start" ]