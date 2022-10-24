import { Queue } from "discord-player";
import { ChatInputCommandInteraction } from "discord.js";
import { Bot } from "src/Structures/Bot";

module.exports = async (client: Bot, queue: Queue, interaction: ChatInputCommandInteraction) => {

    if (!queue || !queue.playing) { // @ts-ignore
        return await client.Reply(interaction, `Command ${client.interaction?.options.getSubcommand()}`, "❌", "I don't find music on your channel sorry", true);
    }

    queue.skip()

    const track = queue.tracks[0]
    
    return await client.Reply(interaction, "Command skip", "✅",  `Music skip to : **${track.title}**`)
}