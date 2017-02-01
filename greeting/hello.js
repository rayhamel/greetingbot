"use strict";

const greet = require("../helpers/greet");
const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();

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
