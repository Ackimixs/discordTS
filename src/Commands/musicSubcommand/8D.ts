import {Queue} from "discord-player";
import { Bot } from "src/Structures/Bot";

module.exports = async (client: Bot, queue: Queue): Promise<void> => {
    if (!queue || !queue.playing) { // @ts-ignore
        return await client.Reply(`Command ${client.interaction?.options.getSubcommand()}`, "❌", "I don't find music on your channel sorry", true);
    }

    // @ts-ignore
    const enable = client.interaction?.options.getBoolean("enable")

    await queue.setFilters({
        "8D": enable
    })

    return await client.Reply("Command 8D", "✅", `8D filter set to **${enable ? "enable": "disable"}**`)

}