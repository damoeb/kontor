FROM node:7.5.0

# RUN npm install webpack -g

WORKDIR /tmp
COPY package.json /tmp/
# RUN npm config set registry http://registry.npmjs.org/ && npm install

WORKDIR /usr/src/app
# COPY . /usr/src/app/
# RUN cp -a /tmp/node_modules /usr/src/app/
# RUN webpack

ENV NODE_ENV=production
ENV PORT=4000

#CMD [ "/usr/local/bin/node", "./app.js" ]
CMD [ "./node_modules/nodemon/bin/nodemon.js", "./app.js" ]
EXPOSE 4000
