# Build step #1: build the React front end
FROM node:16-alpine as build-step
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json package-lock.json ./
COPY ./src ./src
COPY ./public ./public
RUN npm install
RUN npm run build

# Build step #2: build the API with the client as static files
FROM python:3.9
WORKDIR /app
COPY --from=build-step /app/build ./build

COPY requirements.txt ./
RUN pip install -r ./requirements.txt

RUN mkdir ./server
COPY server/main.py ./server/
# ENV FLASK_ENV production

EXPOSE 3000
WORKDIR /app/server
CMD ["gunicorn", "-b", ":3000", "main:app"]
# ENTRYPOINT ["python", "server/main.py"]