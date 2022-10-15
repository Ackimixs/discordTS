"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const updateLogChannel_1 = require("../Structures/db/updateLogChannel");
module.exports = {
    name: "set_log",
    description: "set the logs channel",
    options: [
        {
            type: discord_js_1.ApplicationCommandOptionType.Channel,
            name: "channel",
            description: "channel",
            required: true
        }
    ],
    async execute(client) {
        const { options, member, guildId } = client.interaction;
        const channel = options.getChannel("channel");
        if (!member?.manageable)
            return client.Reply("Commmand log", "❌", "You can't use this command");
        if (!channel || !channel.isTextBased())
            return client.Reply("Commmand log", "❌", "The channel provided is not a text based channel");
        await (0, updateLogChannel_1.updatelogChannel)(guildId, channel);
    }
};
