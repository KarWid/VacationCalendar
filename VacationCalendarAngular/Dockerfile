# # Stage 1: Build an Angular Docker Image
# FROM node:latest as Build
# WORKDIR /apps
# COPY . .
# RUN npm install
# COPY . /apps
# ARG configuration=production
# RUN npm run build -- --output-path=./dist/out --configuration=$configuration

# #Stage 2, use the compiled app, ready for production with Nginx
# FROM nginx:latest
# COPY /nginx-custom.conf /etc/nginx/conf.d/
# RUN rm -rf /usr/share/nginx/html/*
# COPY --from=build /apps/dist/out /usr/share/nginx/html

# Stage 1
FROM node:16.15.1-alpine as Build
WORKDIR /apps
COPY . .
RUN npm install
COPY . /apps
ARG configuration=production
RUN npm run build -- --configuration=$configuration --output-path=./dist/out

# Stage 2
FROM nginx:1.21-alpine
COPY --from=Build /apps/dist/out /usr/share/nginx/html