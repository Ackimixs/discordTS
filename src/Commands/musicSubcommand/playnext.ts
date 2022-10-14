import {Queue} from "discord-player";
import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { Bot } from "src/Structures/Bot";

module.exports = async (client: Bot, queue: Queue): Promise<void> => {

    const { options, user } = client.interaction as ChatInputCommandInteraction

    if (!queue || !queue.playing) { // @ts-ignore
        return await client.Reply(`Command ${client.interaction?.options.getSubcommand()}`, "❌", "I don't find music on your channel sorry", true);
    }

    const query = options.getString("name") as string

    const tracks = await client.player.search(query, {
        requestedBy: user,
    })

    if (!tracks || !tracks.tracks.length) return await client.Reply("Music command", "❌", `I'm sorry but track **${query}** not found`, true);

    await queue.insert(tracks.tracks[0])

    const embed = new EmbedBuilder()
    .setImage(tracks.tracks[0].thumbnail)
    .setTitle("✅ | Insert track **" + tracks.tracks[0].title + "** at the position at the top af the queue")
    .setDescription(`By : ${tracks.tracks[0].author} | duration : ${tracks.tracks[0].duration} | request by ${tracks.tracks[0].requestedBy}`)
    .setColor(client.config.color)
    .setURL(tracks.tracks[0].url)

    await client.interaction?.reply({embeds: [embed]})

}