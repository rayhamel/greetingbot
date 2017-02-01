"use strict";

const greeterMsg = require("../helpers/greeterMsg");

module.exports.notIntroduced = (event, context, callback) => {
    callback(null, {body: greeterMsg("I didn't catch your name…"),
                    statusCode: 200});
};
