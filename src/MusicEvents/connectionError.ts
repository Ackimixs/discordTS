import {Queue} from "discord-player";
import { Bot } from "../Structures/Bot";
import { createEmbed } from "../utils/embed";

module.exports = {
    name: "connectionError",

    async execute(queue: Queue, error: Error, client: Bot) {

        const guild = await client.config.Guild.get(queue.guild.id)

        const channel = await client.channels.fetch(guild?.errorChannel?.id as string)

        if (!channel || !channel.isTextBased()) return;

        const embed = await createEmbed(client)
        embed.setTitle("Music connection error").setDescription('```' + error + "```").setColor(client.config.color).setTimestamp()

        await channel.send({embeds: [embed]});

        throw error;
    }
}