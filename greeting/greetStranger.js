"use strict";

const greet = require("../helpers/greet");

module.exports.greetStranger = (event, context, callback) => {
    callback(null, {body: greet(), statusCode: 200});
};
