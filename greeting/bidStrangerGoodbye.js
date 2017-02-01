"use strict";

const farewell = require("../helpers/farewell");

module.exports.bidStrangerGoodbye = (event, context, callback) => {
    callback(null, {body: farewell(), statusCode: 200});
};
