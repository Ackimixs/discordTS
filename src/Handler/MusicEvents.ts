import * as fs from "fs";
import { Bot } from "src/Structures/Bot";

module.exports = async (client: Bot) => {

    const eventFiles = fs.readdirSync(`./dist/MusicEvents/`).filter(file => (file.endsWith('.js')));

    eventFiles.forEach(file => {
        const event = require(`../MusicEvents/${file}`);
        client.player.on(event.name, async (...args: any) => await event.execute(...args, client));
    })
}