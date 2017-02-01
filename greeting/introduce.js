"use strict";

const db         = require("../helpers/db");
const greet      = require("../helpers/greet");
const greeterMsg = require("../helpers/greeterMsg");

module.exports.introduce = (event, context, callback) => {
    const name = event.pathParameters.name;
    const params = {Item: {greeting: greet(name), name},
                    ReturnValues: "ALL_OLD", TableName: "friends"};
    db.put(params, (err, data) => {
        if (err) {
            callback(err);
            return;
        }
        const welcome = data.Attributes ? 'We meet again' : 'Nice to meet you';
        callback(null, {body: greeterMsg(`${welcome}, ${name}!`),
                        statusCode: 200});
    });
};
