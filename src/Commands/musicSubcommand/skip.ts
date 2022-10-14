import { Queue } from "discord-player";
import { Bot } from "src/Structures/Bot";

module.exports = async (client: Bot, queue: Queue) => {

    if (!queue || !queue.playing) { // @ts-ignore
        return await client.Reply(`Command ${client.interaction?.options.getSubcommand()}`, "❌", "I don't find music on your channel sorry", true);
    }

    queue.skip()

    const track = queue.current
    
    return await client.Reply("Command skip", "✅",  `Music skip to : **${track.title}**`)
}