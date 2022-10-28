import {Queue, QueueRepeatMode} from "discord-player";
import { Bot } from "src/Structures/Bot";
import {ChatInputCommandInteraction} from "discord.js";

module.exports = async (client: Bot, queue: Queue, interaction: ChatInputCommandInteraction): Promise<void> => {

    const { options } = interaction

    if (!queue || !queue.playing) { // @ts-ignore
        return await client.Reply(interaction, `Command ${interaction?.options.getSubcommand()}`, "❌", "I don't find music on your channel sorry", true);
    }

    const mode = options.getInteger("type") as QueueRepeatMode

    if (queue.repeatMode === mode) return await client.Reply(interaction, `Command loop`, "❌", `the loop mode : ${queue.repeatMode} is already enable`, true)

    queue.setRepeatMode(mode)

    await client.Reply(interaction, "Command loop", "✅", `Loop mode set to : ${mode}`);

}