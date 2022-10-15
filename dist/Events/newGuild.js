"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createGuild_1 = require("../Structures/db/createGuild");
module.exports = {
    name: 'guildCreate',
    once: false,
    async execute(guild, client) {
        await (0, createGuild_1.createGuild)(guild.id, client);
        await client.logger("Event", "Guild add", `Guild name : ${guild.name} | guild id : ${guild.id}`);
    }
};
