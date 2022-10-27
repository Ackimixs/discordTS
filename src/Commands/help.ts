import { Bot } from "src/Structures/Bot";
import {ChatInputCommandInteraction, EmbedBuilder} from "discord.js";

module.exports = {
    name: "help",
    description: "help",
    category: "Information",


    async execute(client: Bot, interaction: ChatInputCommandInteraction) {
        const commands = client.commands

        const embed = new EmbedBuilder().setTitle('Command from AckiBot').setDescription("> here the list aff all command available with this bot")

        commands.forEach(command => {
            let options = ''
            command.options?.forEach(option => options += `\n> \`/${command.name} ${option.name}\` => ${option.description}`)

            embed.addFields({
                name: `**${command.name}**`,
                value: `${command.description} ${options}`
            })
        })

        await interaction?.reply({embeds: [embed]})
    }
}