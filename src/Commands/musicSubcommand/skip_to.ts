import { Queue } from "discord-player";
import { Bot } from "src/Structures/Bot";
import {ChatInputCommandInteraction} from "discord.js";

module.exports = async (client: Bot, queue: Queue, interaction: ChatInputCommandInteraction) => {

    const { options } = interaction

    if (!queue || !queue.playing) { // @ts-ignore
        return await client.Reply(interaction, `Command ${interaction?.options.getSubcommand()}`, "❌", "I don't find music on your channel sorry", true);
    }

    const pos = options.getInteger("position") as number

    const skipToTrack = queue.tracks[pos-1]

    queue.skipTo(pos-1);

    return await client.Reply(interaction, "Command skip to", "✅", `Music skip to **${skipToTrack.title}**`)
}