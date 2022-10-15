"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGuild = void 0;
const { GuildDB } = require('./Schema/Guild');
const createGuild = async (guildId, client) => {
    const guild = new GuildDB({
        guildId,
        language: "en"
    });
    await guild.save();
    await client.config?.Guild?.set(guild.id, { guildId: guild.id, language: "en" });
};
exports.createGuild = createGuild;
