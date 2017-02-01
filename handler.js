'use strict';

const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({convertEmptyValues: true});

function greet(name) {
  name = name ? `, ${name}` : '';
  const greetings = [
    `Aloha${name}!`,
    `Bonjour${name}!`,
    `¡Buenas noches${name}!`,
    `¡Buenos días${name}!`,
    `Ciao${name}!`,
    `Good day${name}!`,
    `Good morning${name}!`,
    `Greetings${name}!`,
    `Hello${name}!`,
    `Hey${name}!`,
    `Hi${name}!`,
    `Hiya${name}`,
    `How are you${name}?`,
    `How do you do${name}?`,
    `How goes it${name}?`,
    `Howdy${name}!`,
    `Howdy-do${name}?`,
    `Shalom${name}!`,
    `Welcome${name}!`,
    `What\'s happening${name}?`,
    `What\'s up${name}?`,
  ];
  return greetings[Math.floor(Math.random() * greetings.length)];
}

function farewell(name) {
  name = name ? `, ${name}` : '';
  const farewells = [
    `Adieu${name}!`,
    `¡Adiós${name}!`,
    `Au revoir${name}!`,
    `Bon voyage${name}!`,
    `Bye${name}!`,
    `Bye-bye${name}`,
    `Cheerio${name}`,
    `Cheers${name}!`,
    `Ciao${name}!`,
    `Farewell${name}!`,
    `Godspeed${name}!`,
    `Goodbye${name}!`,
    `¡Hasta la vista${name}!`,
    `Have a nice day${name}!`,
    `Sayonara${name}!`,
    `See you${name}!`,
    `See you later${name}!`,
    `So long${name}!`,
    `Ta-ta${name}!`,
    `Toodle-oo${name}!`,
  ];
  return farewells[Math.floor(Math.random() * farewells.length)];
}

module.exports.getBare = (event, context, callback) => callback(null, {body: greet(), statusCode: 200});

module.exports.hello = (event, context, callback) => {
  db.get({Key: {name: event.pathParameters.name}, TableName: 'friends'}, (err, result) => {
    if (err) return callback(err);
    callback(null, {body: result.Item && result.Item.greeting || greet(), statusCode: 200});
  });
};

module.exports.introduce = (event, context, callback) => {
  const name = event.pathParameters.name;
  const params = {Item: {greeting: greet(name), name}, TableName: 'friends'};
  db.put(params, (err, result) => {
    if (err) return callback(err);
    callback(null, {body: `Nice to meet you, ${name}!`, statusCode: 200});
  });
};

module.exports.goodbyeAnon = (event, context, callback) => callback(null, {body: farewell(), statusCode: 200});

module.exports.goodbye = (event, context, callback) => {
  const name = event.pathParameters.name;
  db.delete({Key: {name}, TableName: 'friends'}, (err, result) => {
    if (err) return callback(err);
    callback(null, {body: farewell(name), statusCode: 200});
  });
};
