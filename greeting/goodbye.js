"use strict";

const db       = require("../helpers/db");
const farewell = require("../helpers/farewell");

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
