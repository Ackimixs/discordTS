import { Bot } from "src/Structures/Bot";
import {Events} from "discord.js";

module.exports = {
    name: Events.Error,
    once: false,

    async execute(error: Error, client: Bot) {
        throw error;
    }
}