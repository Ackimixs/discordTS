import {ApplicationCommandDataResolvable, Events} from "discord.js";
import * as fs from "fs";
import ms from "ms";
import { Bot } from "src/Structures/Bot";

module.exports = async (client: Bot) => {

    const minMusicCommand = ["play", "stop", "pause", "resume", "skip", "nowplaying", "queue", "set"]

    const commandFiles = fs.readdirSync(`./${client.config.dev}/Commands/`).filter(file => (file.endsWith(client.config.dev === "src" ? ".ts" : '.js')));

    const pushCommand = async () => {
        const guilds = await client.guilds.fetch();
        for (let guild of guilds.values()) {
            const full = client.config.Guild.get(guild.id)?.musicSystem;
            const CommandsArray: ApplicationCommandDataResolvable[] = []
            commandFiles.map(async (file) => {
                const command = require(`../Commands/${file}`);
                const data = { ...command }
                await client.commands.set(data.name, data);
                if (file === "music.js" && !full) {
                    data.options = data.options.filter((option: any) => minMusicCommand.includes(option.name))
                }
                CommandsArray.push(data);
            })
            client.guilds.fetch(guild.id).then(async guildData => {
                await guildData.commands.set([...CommandsArray])
            });
        }
        setInterval(async () => await pushCommand(), ms("60s"))
    }

    client.once(Events.ClientReady, async () => {
        await pushCommand()
    })
}