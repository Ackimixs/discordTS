"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const updateMemberCountChannel_1 = require("../Structures/db/updateMemberCountChannel");
module.exports = {
    name: "member_count",
    description: "set the member count channel",
    defaultMemberPermissions: discord_js_1.PermissionsBitField.StageModerator,
    options: [
        {
            type: discord_js_1.ApplicationCommandOptionType.Channel,
            name: "channel",
            description: "channel",
            required: true
        }
    ],
    async execute(client) {
        const { options, guildId, member, guild } = client.interaction;
        const channelQuery = options.getChannel("channel");
        if (!member?.permissions.has(discord_js_1.PermissionsBitField.StageModerator))
            return;
        await (0, updateMemberCountChannel_1.updateMemberCountChannel)(guildId, channelQuery, client);
        const memberCount = guild?.memberCount.toString();
        if (!memberCount)
            return;
        await channelQuery.setName(`Member count - ${memberCount}`);
        await client.Reply("Set log", "✅", `The member count channel is now : ${channelQuery}`);
    }
};
