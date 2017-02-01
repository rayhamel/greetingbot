"use strict";

const greeterMsg = require("./greeterMsg");

module.exports = name => {
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
