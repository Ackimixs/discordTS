"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateErrorChannel = void 0;
const Guild_1 = require("./Schema/Guild");
const updateErrorChannel = async (guildId, errorChannel, client) => {
    const channel = {
        id: errorChannel.id
    };
    await Guild_1.GuildDB.findOneAndUpdate({ guildId }, {
        errorChannel: channel
    });
    const guild = client.config.Guild.get(guildId);
    if (!guild)
        return;
    guild.errorChannel = channel;
};
exports.updateErrorChannel = updateErrorChannel;
