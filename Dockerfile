FROM python:3.8.3-slim
MAINTAINER Chibuzo Nwokolo ISEP eleve 61637
ENV PYTHONUNBUFFERED 1


RUN apt update && \
    apt install --no-install-recommends -y build-essential gcc && \
    apt clean && rm -rf /var/lib/apt/lists/*

    RUN apt-get update \
    && pip install postgres-client

RUN apt update && \
  pip install --upgrade pip


RUN mkdir /app
WORKDIR /app
COPY ./requirements.txt /requirements.txt
RUN pip install -r /requirements.txt --no-cache-dir

COPY ./app /app
