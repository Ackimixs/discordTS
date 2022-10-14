"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    name: "connectionError",
    async execute(queue, error, client) {
        const ErrorChannel = client.config.channel.ErrorChannel.channel || await client.channels.fetch(client.config.channel.ErrorChannel.id);
        if (!ErrorChannel || !ErrorChannel.isTextBased())
            return;
        const embed = new discord_js_1.EmbedBuilder().setTitle("Music error connection").setDescription('```' + error + "```").setColor(client.config.color).setTimestamp();
        await ErrorChannel.send({ embeds: [embed] });
        throw error;
    }
};
