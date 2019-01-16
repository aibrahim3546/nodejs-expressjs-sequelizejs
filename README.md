## node-express-sequelize-boilerplate
This is starter boilerplate for [NodeJs](https://nodejs.org/en/docs/guides/getting-started-guide/) X [Express](https://expressjs.com/) X [SequelizeJs](http://docs.sequelizejs.com/). Before you start I recommend to have some knowledge about **RESTful API** and **MySql**. This boilerplate has already been setup with authentication.

This app is generated using ``express-generator`` click [here](https://expressjs.com/en/starter/generator.html) to check out the documentation. This app also using ``sequelize-cli`` which is installed locally(not globally). I suggest you to [read the sequelize documentation](http://docs.sequelizejs.com/manual/tutorial/migrations.html) to get better understanding on how it works.

## Features
* **ExpressJs** - Framework
* **SequelizeJs** - ORM (Object/Relational Mapper) which provides easy access to MySQL.
* **bcrypt** - [Bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme) is used to hash password.
* **sequelize-cli** - [sequelize-cli](http://docs.sequelizejs.com/manual/tutorial/migrations.html) used to do table mygration.
* **mysql2** - We are using mysql(sequel) as a database.
* **jsonwebtoken** - [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) is used to generate access token from user authentication.

## Quick Start
```
git clone https://github.com/aibrahim3546/nodejs-expressjs-sequelizejs.git
cd nodejs-expressjs-sequelizejs
npm install
```

Go to config.json file and cofigure your database. Setup your database username, password and name.

/config/config.json
```
{
  "development": {
    "username": "root",
    "password": null,
    "database": "database_name",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  }
}
```
Make sure your database are setup and connected properly.

Now let's migrate the table.
Run
```
node_modules/.bin/sequelize db:migrate
```
This command will create two table in your database. User table and Post table.

Now you can start the server and start sending request via Postman or etc.
```
npm start
```

## Available Routes

Unprotected - does not require login.

Protected - require login.
```
GET - / - Main route (Unprotected)

GET - /api/v1/auth/profile/:username (Protected)
PATCH - /api/v1/auth/profile/:username (Protected)
POST - /api/v1/auth/profile/login (Unprotected)
POST - /api/v1/auth/profile/register (Unprotected)

GET - /api/v1/post (Protected)
GET - /api/v1/post/:id (Protected)
POST - /api/v1/post (Protected)
PATCH - /api/v1/post/:id (Protected)
DELETE - /api/v1/post/:id (Protected)
```

## How to call protected route
Step to call a protected route:
-	Register a user by calling the register route.
- Login with the username and password. Once you are successfully logged in you will get a **access token**.
- Pass the access token inside the **Authorization** header like this:
> Authorization: Bearer access-token-here

Make sure there is a space between the **Bearer** and **access token**

**Feel free to contribute**

