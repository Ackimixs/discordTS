"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    name: "trackStart",
    async execute(queue, track, client) {
        const voiceChannel = queue.connection.channel;
        if (!voiceChannel || !voiceChannel.isTextBased())
            return;
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle("✅ | Playing " + track.title)
            .setDescription(`By : ${track.author} | duration : ${track.duration} | request by ${track.requestedBy}`)
            .setColor(client.config.color)
            .setURL(track.url);
        return await voiceChannel.send({ embeds: [embed] });
    }
};
