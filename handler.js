"use strict";

const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();

function greeterMsg(message) {
    return JSON.stringify({message});
}

function greet(name) {
    name = name ? `, ${name}` : "";
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
        `What's happening${name}?`,
        `What's up${name}?`,
    ];
    return greeterMsg(greetings[Math.floor(Math.random() * greetings.length)]);
}

function farewell(name) {
    name = name ? `, ${name}` : "";
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
    return greeterMsg(farewells[Math.floor(Math.random() * farewells.length)]);
}

module.exports.getBare = (event, context, callback) => {
    callback(null, {body: greet(), statusCode: 200});
};

module.exports.hello = (event, context, callback) => {
    const name = event.pathParameters.name;
    db.get({Key: {name}, TableName: "friends"}, (err, data) => {
        if (err) {
            callback(err);
            return;
        }
        const body = data.Item && data.Item.greeting || greet();
        callback(null, {body, statusCode: 200});
    });
};

module.exports.putBare = (event, context, callback) => {
    callback(null, {body: greeterMsg("I didn't catch your name…"),
                    statusCode: 200});
};

module.exports.introduce = (event, context, callback) => {
    const name = event.pathParameters.name;
    const params = {Item: {greeting: greet(name), name}, TableName: "friends"};
    db.put(params, (err, data) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null, {body: greeterMsg(`Nice to meet you, ${name}!`),
                        statusCode: 200});
    });
};

module.exports.deleteBare = (event, context, callback) => {
    callback(null, {body: farewell(), statusCode: 200});
};

module.exports.goodbye = (event, context, callback) => {
    const name = event.pathParameters.name;
    db.delete({Key: {name}, TableName: "friends"}, (err, data) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null, {body: farewell(name), statusCode: 200});
    });
};
