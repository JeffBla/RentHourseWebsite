FROM node:19-alpine
ARG CONT_IMG_VER

ENV CONT_IMG_VER ${CONT_IMG_VER}
ENV PORT 8080
ENV NODE_ENV production

RUN mkdir app

COPY . /app

WORKDIR /app

RUN chmod +x /app/bin/www

RUN cd /app && npm install --silent

EXPOSE 8080

CMD ["npm","start"]
