import {Queue} from "discord-player";
import { Bot } from "src/Structures/Bot";

module.exports = async (client: Bot, queue: Queue): Promise<void> => {

    if (!queue || !queue.playing) { // @ts-ignore
        return await client.Reply(`Command ${client.interaction?.options.getSubcommand()}`, "❌", "I don't find music on your channel sorry", true);
    }

    queue.shuffle()

    await client.Reply('Command shuffle', "✅", "Queue shuffled")
}