# DareNode
Middleware API for Dare

## Requirements
  you need node and npm in order to run the project

## Explanation of used tecnologies and reasons

- Babel, used to allow ES6.
- Axios, used to make the request to Dare API,
- Config, to have the sensible data as secrets keys, etc.
- Express Session, allows you to handle sessions an save data for the session, the given use is to help manage the token renovation
- jsonwebtoken, to create and check all the token data
- node-cache, allows you to have cache data stored, it was use to handle the etags

## Things that i not accomplish:

- End to end test, i would like to do it but i don't have enought time, also i never done it

## Available Scripts

In the project directory, you can run:

### `npm run dev`

app listening in port 3000

### `npm test`

Launches the test runner 
