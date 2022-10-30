import {ApplicationCommandOptionType, Channel, ChatInputCommandInteraction, PermissionsBitField} from "discord.js";
import {Bot} from "../Structures/Bot";
import {updateErrorChannel, updatelogChannel} from "../Structures/db/Guild";


module.exports = {
    name: "set",
    description: "set the different logs channel",
    defaultMemberPermissions: PermissionsBitField.StageModerator,
    options: [
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "log",
            description: "set the general log channel",
            options: [
                {
                    type: ApplicationCommandOptionType.Boolean,
                    name: "enable_log",
                    description: "set enable or disable the log system",
                    required: true
                },
                {
                    type: ApplicationCommandOptionType.Channel,
                    name: "channel",
                    description: "channel",
                    required: false
                },
            ]
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "error",
            description: "set the error log channel",
            options: [
                {
                    type: ApplicationCommandOptionType.Boolean,
                    name: "enable_error",
                    description: "set enable or disable the error log system",
                    required: true
                },
                {
                    type: ApplicationCommandOptionType.Channel,
                    name: "channel",
                    description: "channel",
                    required: false
                },
            ]
        },
    ],

    async execute(client: Bot, interaction: ChatInputCommandInteraction) {

        const { options, guildId } = interaction

        const subCommand = options.getSubcommand()

        let channelQuery = options.getChannel("channel") as Channel
        const enable = options.getBoolean("enable_log") || options.getBoolean("enable_error") || false as boolean

        if (enable && !channelQuery) {
            return client.Reply(interaction, "set log", "❌", "You have to input a channel if you want to set on the log", true)
        }

        if ((!channelQuery || !channelQuery.isTextBased()) && enable) return client.Reply(interaction, "Commmand log", "❌", "The channel provided is not a text based channel", true)

        switch (subCommand) {
            case "log": {

                await updatelogChannel(guildId as string, channelQuery, enable, client)

                await client.Reply(interaction, "Set log", "✅", `The log channel is now ${enable ? `set on : **${channelQuery}**` : '**disable**'}`, true)

                break;
            }
            case "error": {
                await updateErrorChannel(guildId as string, channelQuery, enable, client)

                await client.Reply(interaction, "Set log", "✅", `The error log channel is now ${enable ? `set on : **${channelQuery}**` : '**disable**'}`, true)

                break;
            }
            default: {
                return client.Reply(interaction, "Commmand log", "❌", "Error while updating the channel", true)
            }
        }
    }
}