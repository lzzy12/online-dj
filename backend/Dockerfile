FROM node:20-alpine as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /usr/src/app

ENV PYTHONUNBUFFERED=1

RUN apk add python3 py3-pip

COPY JioSaavn/requirements.txt ./

RUN pip install -r ./requirements.txt --no-cache --break-system-packages

ENV NODE_ENV production

# Install app dependencies
COPY package.json ./

RUN npm install --production 

COPY --from=builder /usr/src/app/build ./
COPY --from=builder /usr/src/app/.env ./
COPY ./start.sh ./
RUN chmod +x start.sh

COPY JioSaavn ./JioSaavn

EXPOSE 3001

EXPOSE 5100

CMD [ "./start.sh" ]