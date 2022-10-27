"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
const ms_1 = tslib_1.__importDefault(require("ms"));
module.exports = async (client) => {
    const minMusicCommand = ["play", "stop", "pause", "resume", "skip", "nowplaying", "queue", "set"];
    const commandFiles = fs.readdirSync(`./${client.config.dev}/Commands/`).filter(file => (file.endsWith(client.config.dev === "src" ? ".ts" : '.js')));
    const pushCommand = async () => {
        const guilds = await client.guilds.fetch();
        for (let guild of guilds.values()) {
            const CommandsArray = [];
            commandFiles.map(async (file) => {
                const command = require(`../Commands/${file}`);
                if (file === "music.js") {
                    const full = client.config.Guild.get(guild.id)?.musicSystem;
                    if (!full) {
                        command.options = command.options.filter((option) => minMusicCommand.includes(option.name));
                    }
                }
                await client.commands.set(command.name, command);
                CommandsArray.push(command);
            });
            client.guilds.fetch(guild.id).then(guild => guild.commands.set(CommandsArray));
        }
    };
    client.once('ready', async () => {
        await pushCommand();
        await setInterval(async () => {
            await pushCommand();
        }, ((0, ms_1.default)("60s")));
    });
};
