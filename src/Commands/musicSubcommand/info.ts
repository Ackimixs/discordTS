import {Queue} from "discord-player";
import { Bot } from "src/Structures/Bot";
import {createEmbed} from "../../utils/embed";

module.exports = async (client: Bot, queue: Queue): Promise<void> => {

    if (!queue || !queue.playing) { // @ts-ignore
        return await client.Reply(`Command ${client.interaction?.options.getSubcommand()}`, "❌", "I don't find music on your channel sorry", true);
    }

    const song = queue.current

    await client.Reply(`Info : ${song.title}`, "✅", `Author **${song.author}** | Duration : ${song.duration}`);
}