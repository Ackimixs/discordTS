import { ChatInputCommandInteraction } from "discord.js";
import { Bot } from "src/Structures/Bot";

module.exports = {
    name: "ping",
    description: "Display the ping",
    category: "Information",


    async execute(client: Bot, interaction: ChatInputCommandInteraction) {
        return client?.Reply(interaction, "Ping", "✅", `The current ping is \`${client.ws.ping} ms\``, true);
    }
}