"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGuild = void 0;
const { GuildDB } = require('./Schema/Guild');
const getGuild = async (guildId) => {
    return GuildDB.findOne({
        guildId
    });
};
exports.getGuild = getGuild;
