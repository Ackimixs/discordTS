import { Bot } from "src/Structures/Bot";

module.exports = {
    name: 'error',
    once: false,

    async execute(error: Error, client: Bot) {
        throw error;
    }
}