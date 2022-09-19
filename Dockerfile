FROM node:14.15.0
WORKDIR /usr/src/nchandi
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@7.3.9
COPY . /user/src/nchandi
RUN npm rebuild node-sass
CMD npm run start