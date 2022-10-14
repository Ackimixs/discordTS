import {Queue} from "discord-player";
import { Bot } from "src/Structures/Bot";
import {ChatInputCommandInteraction} from "discord.js";

module.exports = async (client: Bot, queue: Queue): Promise<void> => {

    const { options } = client.interaction as ChatInputCommandInteraction

    if (!queue || !queue.playing) { // @ts-ignore
        return await client.Reply(`Command ${client.interaction?.options.getSubcommand()}`, "❌", "I don't find music on your channel sorry", true);
    }

    const vol = options.getInteger("set") as number

    if (vol > 100 || vol < 0) return await client.Reply('Command volume', "❌", "Volume must be between 0 and 100", true)

    queue.setVolume(vol);

    await client.Reply('Command volume', "✅", `Volume set to \`${vol}\``);
}