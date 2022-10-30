"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Guild_1 = require("../Structures/db/Guild");
module.exports = {
    name: discord_js_1.Events.GuildCreate,
    once: false,
    async execute(guild, client) {
        const data = await (0, Guild_1.createGuild)(guild.id);
        client.config.Guild.set(data.guildId, data);
        await client.logger("Event", "Guild add", `Guild name : ${guild.name} | guild id : ${guild.id}`);
    }
};
