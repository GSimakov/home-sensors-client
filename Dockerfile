FROM node:21.7.1-alpine
WORKDIR /app
COPY . /app/
RUN npm install
RUN npm run build

ENV REACT_APP_SERVER_URL = "http://192.168.0.10:8001/"

CMD ["npm", "start"]
EXPOSE 3000
