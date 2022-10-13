import { Bot } from "src/Structures/Bot";

module.exports = {
    name: "ping",
    description: "Display the ping",
    category: "Information",


    async execute(client: Bot) {
        await client?.Reply("Command", "✅", "Pong", true);
    }
}