"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const updateErrorChannel_1 = require("../Structures/db/updateErrorChannel");
module.exports = {
    name: "set_error_log",
    description: "set the error logs channel",
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
            return client.Reply("Commmand Error log", "❌", "You can't use this command");
        if (!channel || !channel.isTextBased())
            return client.Reply("Commmand Error log", "❌", "The channel provided is not a text based channel");
        await (0, updateErrorChannel_1.updateErrorChannel)(guildId, channel);
    }
};
