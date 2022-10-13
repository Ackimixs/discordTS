"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    name: 'test',
    description: 'test',
    category: "Information",
    options: [
        {
            name: "member",
            description: "The member you want to ban",
            type: discord_js_1.ApplicationCommandOptionType.Integer,
            required: true
        },
    ],
    async execute(client) {
        client.interaction?.reply("true");
    }
};
