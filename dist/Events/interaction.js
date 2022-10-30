"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    name: discord_js_1.Events.InteractionCreate,
    once: false,
    async execute(interaction, client) {
        const { user, guild, commandName, type } = interaction;
        if (type !== discord_js_1.InteractionType.ApplicationCommand)
            return;
        const command = client.commands.get(commandName);
        if (!command) {
            await interaction.reply('An error occured please check with admin');
            return client.commands.delete(command);
        }
        await command.execute(client, interaction);
        await client.logger("Command", interaction.commandName, ` user : ${user.tag} in guild : ${guild?.name}`, guild);
    }
};
