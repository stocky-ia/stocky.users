FROM node:latest

# Se preferir outro endereço, pode mudar livremente
WORKDIR /usr/src/users

# Copy package.json and package-lock.json to the container
COPY package*.json ./

RUN npm install

# O bcrypt só vai funcionar se for buildado dentro do container
RUN npm rebuild bcrypt --build-from-source

COPY . .

# Deixei tudo na porta 3131
EXPOSE 3131

CMD ["npm", "start"]
