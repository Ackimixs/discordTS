import {ApplicationCommandDataResolvable, Events} from "discord.js";
import * as fs from "fs";
import { Bot } from "src/Structures/Bot";

module.exports = async (client: Bot) => {

    const commandFiles = fs.readdirSync(`./${client.config.dev}/Commands/`).filter(file => (file.endsWith(client.config.dev === "src" ? ".ts" : '.js')));

    const pushCommand = async () => {
        const guilds = await client.guilds.fetch();
        for (let guild of guilds.values()) {
            const CommandsArray: ApplicationCommandDataResolvable[] = []
            commandFiles.map(async (file) => {
                //TODO check file music min or full
                const command = require(`../Commands/${file}`);
                if (file.startsWith("music_full")) {
                    await client.commands.set(command.name, command);
                } else if (file.startsWith("music_min")) {
                    CommandsArray.push(command);
                } else {
                    await client.commands.set(command.name, command);
                    CommandsArray.push(command);
                }
            })
            client.guilds.fetch(guild.id).then(async guildData => {
                await guildData.commands.set([...CommandsArray])
            });
        }
    }

    client.once(Events.ClientReady, async () => {
        await pushCommand()
    })
}