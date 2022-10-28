import { CommandInteraction, InteractionType} from "discord.js"
import { Bot } from "src/Structures/Bot";
import {Command} from "../interface/command";


module.exports = {
    name: 'interactionCreate',
    once: false,

    async execute(interaction: CommandInteraction, client: Bot) {

        const { user, guild, commandName, type} = interaction

        if (type !== InteractionType.ApplicationCommand) return;

        const command: Command = client.commands.get(commandName) as Command;

        if (!command) {
            await interaction.reply('An error occured please check with admin');
            return client.commands.delete(command)
        }

        await command.execute(client, interaction);

        await client.logger("Command", interaction.commandName, ` user : ${user.tag} in guild : ${guild?.name}`, guild)
    }
}