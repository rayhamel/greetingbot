"use strict";

const db         = require("../helpers/db");
const greet      = require("../helpers/greet");
const greeterMsg = require("../helpers/greeterMsg");

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
