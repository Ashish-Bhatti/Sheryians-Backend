=> docker setup
1. get runtime env and OS
# it will get node20 runtime environment and alpine-linux OS
FROM node:20-alpine

2. COPY packages file
# copy packages files for better caching
COPY package.json .
COPY package-lock.json .

3. install dependenices
# install dependencies
RUN npm install

4. COPY codebase
# copy the all the codebase files
COPY server.js .

5. run the application
# Start the application
CMD [ "node", "server.js" ]