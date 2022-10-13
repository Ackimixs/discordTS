"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    name: "help",
    description: "help",
    category: "Information",
    async execute(client) {
        const commands = client.commands;
        const embed = new discord_js_1.EmbedBuilder().setTitle('Command from AckiBot').setDescription("> here the list aff all command available with this bot");
        commands.forEach(command => {
            let options = '';
            command.options?.forEach(option => options += `\n> \`/${command.name} ${option.name}\` => ${option.description}`);
            embed.addFields({
                name: `**${command.name}**`,
                value: `${command.description} ${options}`
            });
        });
        await client.interaction?.reply({ embeds: [embed] });
    }
};
