FROM openjdk:8-jre-alpine
CMD install -d -m 0777 /images/study/books/
COPY ./target/slack-0.0.1-SNAPSHOT.jar /usr/source/be.jar
COPY ./wait-for-it.sh /usr/source/
RUN chmod 777 /usr/source/wait-for-it.sh
RUN apk add --no-cache bash
WORKDIR /usr/source/
EXPOSE 8080
