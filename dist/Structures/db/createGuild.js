"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGuild = void 0;
const Session_1 = require("./Session");
const { GuildDB } = require('./Schema/Guild');
const createGuild = async (guildId, client) => {
    const blindtestSession = await (0, Session_1.createSession)(guildId);
    const guild = new GuildDB({
        guildId,
        language: "en",
        blindtestSession
    });
    await guild.save();
    await client.config?.Guild?.set(guild.id, { guildId: guild.id,
        language: "en",
        blindtestSession });
};
exports.createGuild = createGuild;
