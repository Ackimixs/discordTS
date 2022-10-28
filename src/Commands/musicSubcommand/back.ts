import {Queue} from "discord-player";
import { ChatInputCommandInteraction } from "discord.js";
import { Bot } from "src/Structures/Bot";

module.exports = async (client: Bot, queue: Queue, interaction: ChatInputCommandInteraction): Promise<void> => {

    if (!queue || !queue.playing) { // @ts-ignore
        return await client.Reply(interaction, `Command ${interaction?.options.getSubcommand()}`, "❌", "I don't find music on your channel sorry", true);
    }

    await queue.back()

    const song = await queue.current

    await client.Reply(interaction, "Command back", "✅", `Back to **${song.title}**`);
}