FROM node:4.5
EXPOSE 9001
ENV PORT=9001
COPY app.js .
COPY package.json .
RUN npm install
CMD npm start

