import {Queue} from "discord-player";
import { EmbedBuilder, TextBasedChannel } from "discord.js";
import { Bot } from "src/Structures/Bot";

module.exports = {
    name: "connectionError",

    async execute(queue: Queue, error: Error, client: Bot) {

        const ErrorChannel = client.config.channel.ErrorChannel.channel || await client.channels.fetch(client.config.channel.ErrorChannel.id as string) as TextBasedChannel

        if (!ErrorChannel || !ErrorChannel.isTextBased()) return;

        const embed = new EmbedBuilder().setTitle("Music error connection").setDescription('```' + error + "```").setColor(client.config.color).setTimestamp()

        await ErrorChannel.send({embeds: [embed]});

        throw error;
    }
}