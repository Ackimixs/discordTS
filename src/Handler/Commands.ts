import { ApplicationCommandDataResolvable } from "discord.js";
import * as fs from "fs";
import { Bot } from "src/Structures/Bot";

module.exports = async (client: Bot) => {

    const commandFiles = fs.readdirSync(`./dist/Commands/`).filter(file => (file.endsWith('.js')));


    const CommandsArray: ApplicationCommandDataResolvable[] = []

    commandFiles.map(async (file) => {

        const command = require(`../Commands/${file}`);

        await client.commands.set(command.name, command);
        CommandsArray.push(command);
    })


    client.once('ready', async () => {

        const guilds = await client.guilds.fetch();
        guilds.forEach(guild => {
            client.guilds.fetch(guild.id).then(guild => guild.commands.set(CommandsArray));
        })
    })

}