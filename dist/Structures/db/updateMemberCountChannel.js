"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMemberCountChannel = void 0;
const Guild_1 = require("./Schema/Guild");
const updateMemberCountChannel = async (guildId, memberCount, client) => {
    const channel = {
        id: memberCount.id
    };
    await Guild_1.GuildDB.findOneAndUpdate({ guildId }, {
        memberCoutChannel: channel
    });
    const guild = client.config.Guild.get(guildId);
    if (!guild)
        return;
    guild.memberCoutChannel = channel;
};
exports.updateMemberCountChannel = updateMemberCountChannel;
