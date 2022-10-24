import {Queue} from "discord-player";
import { Bot } from "src/Structures/Bot";
import {ChatInputCommandInteraction, EmbedBuilder} from "discord.js";

module.exports = async (client: Bot, queue: Queue, interaction: ChatInputCommandInteraction): Promise<void> => {

    if (!queue || !queue.playing) { // @ts-ignore
        return await client.Reply(interaction, `Command ${client.interaction?.options.getSubcommand()}`, "❌", "I don't find music on your channel sorry", true);
    }

    const embed = new EmbedBuilder()
    .setTitle("Queue")

    const tracks = queue.tracks.slice(0, 7).map((m, i) => {
        return `${i+1}. **${m.title}** duration : \`${m.duration}\` ([link](${m.url}))`;
    });

    if (tracks.length > 0) {
        embed.setDescription(`${tracks.join('\n')}${queue.tracks.length > 5 ? `\n...${queue.tracks.length - 5} more track(s)` : ''}`)
    }

    embed.addFields({
        name: "nowplaying",
        value: `title : **${queue.current.title}**`
    })

    await client.replyEmbed(interaction, embed)
}