import { Bot } from "src/Structures/Bot";

module.exports = {
    name: 'test',
    description: 'test',
    category: "Information",
    options: [
        {
        type: 2,
        name: "test",
        description: "test",
        require: true
    }
    ],
    async execute(client: Bot) {
        client.interaction?.reply("true")
    }
}