"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatelogChannel = void 0;
const Guild_1 = require("./Schema/Guild");
const updatelogChannel = async (guildId, logChannel) => {
    const channel = {
        id: logChannel.id
    };
    await Guild_1.GuildDB.findOneAndUpdate({ guildId }, {
        logChannel: channel
    });
};
exports.updatelogChannel = updatelogChannel;
