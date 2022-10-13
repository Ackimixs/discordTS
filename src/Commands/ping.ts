import { Bot } from "src/Structures/Bot";

module.exports = {
    name: "ping",
    description: "Display the ping",
    category: "Information",


    async execute(client: Bot) {
        return client?.Reply("Ping", "✅", `The current ping is \`${client.ws.ping} ms\``, true);
    }
}