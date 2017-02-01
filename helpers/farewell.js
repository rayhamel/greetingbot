"use strict";

const greeterMsg = require("./greeterMsg");

module.exports = name => {
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
