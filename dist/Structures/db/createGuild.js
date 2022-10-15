"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGuild = void 0;
const { GuildDB } = require('./Schema/Guild');
const createGuild = async (guildId) => {
    const guild = new GuildDB({
        guildId
    });
    await guild.save();
};
exports.createGuild = createGuild;
