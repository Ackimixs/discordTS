import {Queue, Track} from "discord-player";
import {EmbedBuilder} from "discord.js";
import { Bot } from "src/Structures/Bot";


module.exports = {
    name: "trackStart",

    async execute(queue: Queue, track: Track, client: Bot) {
        //TODO verif if a blindtest is started on the guild => no output
        const guild = queue.guild

        if (!client.config.Guild.get(guild.id)?.blindtestSession?.terminate) return;

        const voiceChannel = queue.connection.channel

        if (!voiceChannel || !voiceChannel.isTextBased()) return;

        const embed = new EmbedBuilder()
        .setTitle("✅ | Playing " + track.title)
        .setDescription(`By : ${track.author} | duration : ${track.duration} | request by ${track.requestedBy}`)
        .setColor(client.config.color)
        .setURL(track.url)

        return await voiceChannel.send({embeds: [embed]})

    }
}