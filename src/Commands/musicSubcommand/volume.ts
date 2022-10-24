import {Queue} from "discord-player";
import { Bot } from "src/Structures/Bot";
import {ChatInputCommandInteraction} from "discord.js";

module.exports = async (client: Bot, queue: Queue, interaction: ChatInputCommandInteraction): Promise<void> => {

    const { options } = interaction

    if (!queue || !queue.playing) { // @ts-ignore
        return await client.Reply(interaction, `Command ${interaction?.options.getSubcommand()}`, "❌", "I don't find music on your channel sorry", true);
    }

    const vol = options.getInteger("set") as number

    if (vol > 100 || vol < 0) return await client.Reply(interaction, 'Command volume', "❌", "Volume must be between 0 and 100", true)

    queue.setVolume(vol);

    await client.Reply(interaction, 'Command volume', "✅", `Volume set to \`${vol}\``);
}