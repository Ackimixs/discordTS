import {Queue} from "discord-player";
import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { Bot } from "src/Structures/Bot";

module.exports = async (client: Bot, queue: Queue, interaction: ChatInputCommandInteraction): Promise<void> => {

    const { options, user } = interaction

    if (!queue || !queue.playing) { // @ts-ignore
        return await client.Reply(interaction, `Command ${interaction?.options.getSubcommand()}`, "❌", "I don't find music on your channel sorry", true);
    }

    const query = options.getString("name") as string

    let index = options.getInteger("index") as number

    index--

    if (index < 0) { // @ts-ignore
        return await client.Reply(interaction, `Command ${interaction?.options.getSubcommand()}`, "❌", "Please put a valid number (0 - n)", true);
    }

    const tracks = await client.player.search(query, {
        requestedBy: user,
    })

    if (!tracks || !tracks.tracks.length) return await client.Reply(interaction, "Music command", "❌", `I'm sorry but track **${query}** not found`, true);

    await queue.insert(tracks.tracks[0], index)

    const embed = new EmbedBuilder()
    .setImage(tracks.tracks[0].thumbnail)
    .setTitle("✅ | Insert track **" + tracks.tracks[0].title + "** at the position : " + index)
    .setDescription(`By : ${tracks.tracks[0].author} | duration : ${tracks.tracks[0].duration} | request by ${tracks.tracks[0].requestedBy}`)
    .setColor(client.config.color)
    .setURL(tracks.tracks[0].url)

    await client.replyEmbed(interaction, embed)

}