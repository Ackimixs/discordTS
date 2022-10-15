"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const embed_1 = require("../utils/embed");
module.exports = {
    name: "error",
    async execute(queue, error, client) {
        const guild = await client.config.Guild.get(queue.guild.id);
        const channel = await client.channels.fetch(guild?.errorChannel?.id);
        if (!channel || !channel.isTextBased())
            return;
        const embed = await (0, embed_1.createEmbed)(client);
        embed.setTitle("Music error").setDescription('```' + error + "```").setColor(client.config.color).setTimestamp();
        await channel.send({ embeds: [embed] });
        throw error;
    }
};
