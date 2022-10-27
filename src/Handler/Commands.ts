import { ApplicationCommandDataResolvable } from "discord.js";
import * as fs from "fs";
import ms from "ms";
import { Bot } from "src/Structures/Bot";

module.exports = async (client: Bot) => {

    const minMusicCommand = ["play", "stop", "pause", "resume", "skip", "nowplaying", "queue", "set"]

    const commandFiles = fs.readdirSync(`./${client.config.dev}/Commands/`).filter(file => (file.endsWith(client.config.dev === "src" ? ".ts" : '.js')));

    const pushCommand = async () => {
        const guilds = await client.guilds.fetch();

        for (let guild of guilds.values()) {
            const CommandsArray: ApplicationCommandDataResolvable[] = []
            commandFiles.map(async (file) => {
                const command = require(`../Commands/${file}`);
                if (file === "music.js") {
                    const full = client.config.Guild.get(guild.id)?.musicSystem;
                    if (!full) {
                        command.options = command.options.filter((option: any) => minMusicCommand.includes(option.name))
                    }
                }
                await client.commands.set(command.name, command);
                CommandsArray.push(command);
            })

            client.guilds.fetch(guild.id).then(guild => guild.commands.set(CommandsArray));
        }
    }

    client.once('ready', async () => {
        await pushCommand()
        await setInterval(async () => {
            await pushCommand()
        }, (ms("60s")))
    })
}