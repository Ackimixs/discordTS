import {Queue} from "discord-player";
import { Bot } from "src/Structures/Bot";
import {ChatInputCommandInteraction} from "discord.js";

module.exports = async (client: Bot, queue: Queue, interaction: ChatInputCommandInteraction): Promise<void> => {

    const { options } = interaction

    if (!queue || !queue.playing) { // @ts-ignore
        return await client.Reply(interaction `Command ${client.interaction?.options.getSubcommand()}`, "❌", "I don't find music on your channel sorry", true);
    }

    const time = options.getInteger('time') as number

    await queue.seek(time*1000)

    await client.Reply(interaction, 'Command seek', "✅", `Seeked to ${time} secondes`)

}