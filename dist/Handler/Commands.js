"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
module.exports = async (client) => {
    const commandFiles = fs.readdirSync(`./dist/Commands/`).filter(file => (file.endsWith('.js')));
    const CommandsArray = [];
    commandFiles.map(async (file) => {
        const command = require(`../Commands/${file}`);
        await client.commands.set(command.name, command);
        CommandsArray.push(command);
    });
    client.on('ready', async () => {
        const guilds = await client.guilds.fetch();
        guilds.forEach(guild => {
            client.guilds.fetch(guild.id).then(guild => guild.commands.set(CommandsArray));
        });
    });
};
