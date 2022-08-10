# Chat Server

## Application, framework, and technology
- PostgreSQL: [PostgreSQL](https://www.postgresql.org/) version 14.4 downloaded from https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
- Node.js: [Node.js](https://nodejs.org/) version v16.15.1 downloaded from https://nodejs.org/en/download
- Yarn: [Yarn](https://yarnpkg.com/) installed by command `npm install --global yarn`

## Description

This is a chat server that allows users to connect to it and send messages to each other.

Clone the repository:

```bash
$ git clone 

## Installation

```bash
$ yarn install
```

## Before run the server

Create environment variables (.env) file:

```bash
NODE_ENV=development

## DATABASE ##
DB_HOST = localhost
DB_PORT = 5432
DB_USERNAME = ## your username ##
DB_PASSWORD = ## password of postgres ##
DB_DATABASE = ## your database name ##

## JWT ##
JWT_SECRET = ## your secret for jwt ##
JWT_EXPIRES_IN = ## your expires in. Example: 259200 ##

JWT_ALGORITHM = HS256
JWT_REFRESH_SECRET = ## your secret for jwt refresh ##
JWT_REFRESH_EXPIRES_IN = ## your expires in. Example: 604800 ##
```

If run in development mode, you must migrate the database:

```bash
yarn typeorm:run
```

After migrate the database, you can check the database has 5 tables: <i><b>migrations, users, messages, conversations, infomations</b></i>.

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Stay in touch
- Facebook: [Long Nguyen Van](https://www.facebook.com/longkenvy)
- Github: [Nguyễn Văn Long](https://github.com/longbaby5512)
- Email: [long.nv120900@gmail.com](mailto:long.nv120900@gmail.com)
- Linkedin: [Nguyễn Văn Long](https://www.linkedin.com/in/nguyenvanlong)
- Phone: [+84 972 976 843](tel:+84972976843)
