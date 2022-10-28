import { Queue, QueueFilters} from "discord-player";
import { ChatInputCommandInteraction } from "discord.js";
import { Bot } from "src/Structures/Bot";

module.exports = async (client: Bot, queue: Queue, interaction: ChatInputCommandInteraction): Promise<void> => {
    if (!queue || !queue.playing) {
        return await client.Reply(interaction, `Command ${interaction.options.getSubcommand()}`, "❌", "I don't find music on your channel sorry", true);
    }

    const enable = interaction.options.getBoolean("enable") as boolean

    const actualFilter = queue.getFiltersEnabled()

    let filter: QueueFilters = {
        bassboost_high: enable,
    }

    actualFilter.forEach(f => {
        if (f !== "bassboost_high") {
            filter[f] = true
        } else {
            filter[f] = enable
        }
    })

    await queue.setFilters(filter)

    return await client.Reply(interaction, "Command bassboost", "✅", `bassboost filter set to **${enable ? "enable": "disable"}**`, true)

}