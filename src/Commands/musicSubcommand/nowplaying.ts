import {Queue} from "discord-player";
import { Bot } from "src/Structures/Bot";
import {EmbedBuilder} from "discord.js";

module.exports = async (client: Bot, queue: Queue): Promise<void> => {

    if (!queue || !queue.playing) { // @ts-ignore
        return await client.Reply(`Command ${client.interaction?.options.getSubcommand()}`, "❌", "I don't find music on your channel sorry", true);
    }

    const np = queue.nowPlaying()
    const pb = queue.createProgressBar()

    const embed = new EmbedBuilder()
    .setTitle(np.title ? np.title : null)
    .setDescription(np.description ? np.description + "\n" + pb : pb)
    .setURL(np.url ? np.url  : null)
    .setThumbnail(np.thumbnail)

    await client.interaction?.reply({embeds: [embed]})

}