import { Bot } from "src/Structures/Bot";
import consola from "consola";

module.exports = {
    name: 'error',
    once: false,

    async execute(error: Error, client: Bot) {
        consola.error(error);
    }
}