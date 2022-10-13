import { Bot } from "src/Structures/Bot";
import {ApplicationCommandOptionType} from "discord.js";

module.exports = {
    name: 'test',
    description: 'test',
    category: "Information",
    options: [
        {
            name: "member",
            description: "The member you want to ban",
            type: ApplicationCommandOptionType.Integer,
            required: true
        },
    ],
    async execute(client: Bot) {
        client.interaction?.reply("true")
    }
}