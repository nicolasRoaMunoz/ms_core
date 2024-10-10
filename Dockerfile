FROM node:22-alpine3.19

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install -g @angular/cli
RUN npm install

COPY . .

RUN npm run build --prod

FROM nginxinc/nginx-unprivileged
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /usr/src/app/dist/bookproject /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

# EXPOSE 3000
# CMD ["npm", "run", "dev"] 

# docker build -t core:0.0.4 .
# docker run -d -p 3000:3000 --name core_01 core:0.0.4