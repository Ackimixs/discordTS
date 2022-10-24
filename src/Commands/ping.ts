import { Bot } from "src/Structures/Bot";

module.exports = {
    name: "ping",
    description: "Display the ping",
    category: "Information",


    async execute(client: Bot) {
        const interaction = client.interaction
        if (!interaction) return
        return client?.Reply(interaction, "Ping", "✅", `The current ping is \`${client.ws.ping} ms\``, true);
    }
}