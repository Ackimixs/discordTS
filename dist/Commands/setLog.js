"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const updateLogChannel_1 = require("../Structures/db/updateLogChannel");
const updateErrorChannel_1 = require("../Structures/db/updateErrorChannel");
module.exports = {
    name: "set",
    description: "set the different logs channel",
    defaultMemberPermissions: discord_js_1.PermissionsBitField.StageModerator,
    options: [
        {
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            name: "log",
            description: "set the general log channel",
            options: [
                {
                    type: discord_js_1.ApplicationCommandOptionType.Channel,
                    name: "channel",
                    description: "channel",
                    required: true
                }
            ]
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            name: "error",
            description: "set the error log channel",
            options: [
                {
                    type: discord_js_1.ApplicationCommandOptionType.Channel,
                    name: "channel",
                    description: "channel",
                    required: true
                }
            ]
        }
    ],
    async execute(client) {
        const { options, guildId, member } = client.interaction;
        const subCommand = options.getSubcommand();
        const channelQuery = options.getChannel("channel");
        if (!member?.permissions.has(discord_js_1.PermissionsBitField.StageModerator))
            if (!channelQuery || !channelQuery.isTextBased())
                return client.Reply("Commmand log", "❌", "The channel provided is not a text based channel", true);
        switch (subCommand) {
            case "log": {
                await (0, updateLogChannel_1.updatelogChannel)(guildId, channelQuery, client);
                await client.Reply("Set log", "✅", `The log channel is now : ${channelQuery}`);
                break;
            }
            case "error": {
                await (0, updateErrorChannel_1.updateErrorChannel)(guildId, channelQuery, client);
                await client.Reply("Set log", "✅", `The log channel is now : ${channelQuery}`);
                break;
            }
            default: {
                return client.Reply("Commmand log", "❌", "Error while updating the channel", true);
            }
        }
    }
};
