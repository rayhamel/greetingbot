"use strict";

const farewell = require("../helpers/farewell");
const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();

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
