![alt text](https://ibb.co/b5Lscn)
A Javascript snake used to competed in Battlesnake 2018. The snake used a sieve technique to eliminate incorrect moves, and a recursive space calculating algorithm to prevent it from being trapped. The snake competed in the intermediate category and was able to beat the challenge snakes for GiftBit and Sendwithus. This snake was trained on the snakedown test servers (https://play.snakedown.com/). At it's height, the snake made it to 6th place. 


# battlesnake-node(js)

A simple [BattleSnake AI](https://battlesnake.io) written in Javascript for NodeJS.

To get started you'll need a working NodeJS development environment, and at least read the Heroku docs on [deploying a NodeJS app](https://devcenter.heroku.com/articles/getting-started-with-nodejs).

If you haven't setup a NodeJS development environment before, read [how to get started with NodeJS](http://nodejs.org/documentation/tutorials/). You'll also need [npm](https://www.npmjs.com/) for easy JS dependency management.

This client uses [Express4](http://expressjs.com/en/4x/api.html) for easy route management, read up on the docs to learn more about reading incoming JSON params, writing responses, etc.

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Running the AI locally

Fork and clone this repo:

```shell
git clone git@github.com:sendwithus/battlesnake-node.git
cd battlesnake-node
```

Install the client dependencies:

```shell
npm install
```

Create an `.env` file in the root of the project and add your environment variables (optional).

Run the server:

```shell
npm start
```

Test the client in your browser: [http://localhost:5000](http://localhost:5000)

## Deploying to Heroku

Click the Deploy to Heroku button at the top or use the command line commands below.

Create a new NodeJS Heroku app:

```shell
heroku create [APP_NAME]
```

Push code to Heroku servers:

```shell
git push heroku master
```

Open Heroku app in browser:

```shell
heroku open
```

Or go directly via <http://APP_NAME.herokuapp.com>

View/stream server logs:

```shell
heroku logs --tail
```
