FROM node:18 as build

WORKDIR /ui-app

COPY package*.json ./

RUN npm install --silent

RUN npm install react-scripts@5.0.1 -g --silent

COPY . .

RUN npm run build

# ENV PORT=5000

# EXPOSE 5000

# CMD [ "npm", "start" ]


# NGINX
# ---------------------------------
FROM nginx:1.22.1-alpine

# Get the React build files from the previous stage and put them in the NGINX folder
COPY --from=build /ui-app/build /usr/share/nginx/html 

# Delete the default config files that come with NGINX
RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]