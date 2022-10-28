import * as fs from "fs";
import { Bot } from "src/Structures/Bot";

module.exports = async (client: Bot) => {

    const eventFiles = fs.readdirSync(`./dist/Events/`).filter(file => (file.endsWith(client.config.dev === "src" ? '.ts': '.js')));

    eventFiles.forEach(file => {
        const event = require(`../Events/${file}`);

        if (event.once) {
            client.once(event.name, async (...args) => await event.execute(...args, client));
        } else {
            client.on(event.name, async (...args) => await event.execute(...args, client));
        }
    })
}