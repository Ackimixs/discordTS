import {Queue} from "discord-player";
import { Bot } from "src/Structures/Bot";
import {ChatInputCommandInteraction, EmbedBuilder} from "discord.js";

module.exports = async (client: Bot, queue: Queue, interaction: ChatInputCommandInteraction): Promise<void> => {

    if (!queue || !queue.playing) { // @ts-ignore
        return await client.Reply(interaction, `Command ${interaction?.options.getSubcommand()}`, "❌", "I don't find music on your channel sorry", true);
    }

    const np = queue.nowPlaying()
    const pb = queue.createProgressBar()

    const embed = new EmbedBuilder()
    .setTitle(np.title ? np.title : null)
    .setDescription(np.description ? np.description + "\n" + pb : pb)
    .setURL(np.url ? np.url  : null)
    .setThumbnail(np.thumbnail)

    await client.replyEmbed(interaction, embed)

}