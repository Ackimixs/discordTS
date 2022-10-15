"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatelogChannel = void 0;
const Guild_1 = require("./Schema/Guild");
const updatelogChannel = async (guildId, logChannel, client) => {
    const channel = {
        id: logChannel.id
    };
    await Guild_1.GuildDB.findOneAndUpdate({ guildId }, {
        logChannel: channel
    });
    const guild = client.config.Guild.get(guildId);
    if (!guild)
        return;
    guild.logChannel = channel;
};
exports.updatelogChannel = updatelogChannel;
