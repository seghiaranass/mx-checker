FROM node:18-slim

WORKDIR /app

COPY . .

RUN npm install validator dns  mysql2 express multer



ENV directory_name infi
ENV db_ip 88.99.25.58
ENV db_port 2208
ENV db_user root
ENV db_password 12345
ENV db mx_checker


CMD ["node","app.js"]