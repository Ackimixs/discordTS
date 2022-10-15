import {ApplicationCommandOptionType, Channel, ChatInputCommandInteraction, PermissionsBitField} from "discord.js";
import { Bot } from "../Structures/Bot";
import { updatelogChannel } from "../Structures/db/updateLogChannel";
import {updateErrorChannel} from "../Structures/db/updateErrorChannel";


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
                    type: ApplicationCommandOptionType.Channel,
                    name: "channel",
                    description: "channel",
                    required: true
                }
            ]
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "error",
            description: "set the error log channel",
            options: [
                {
                    type: ApplicationCommandOptionType.Channel,
                    name: "channel",
                    description: "channel",
                    required: true
                }
            ]
        }
    ],

    async execute(client: Bot) {
        const { options, guildId, member } = client.interaction as ChatInputCommandInteraction

        const subCommand = options.getSubcommand()


        const channelQuery = options.getChannel("channel") as Channel

        // @ts-ignore
        if (!member?.permissions.has(PermissionsBitField.StageModerator))

        if (!channelQuery || !channelQuery.isTextBased()) return client.Reply("Commmand log", "❌", "The channel provided is not a text based channel", true)

        switch (subCommand) {
            case "log": {
                await updatelogChannel(guildId as string, channelQuery, client)

                await client.Reply("Set log", "✅", `The log channel is now : ${channelQuery}`)

                break;
            }
            case "error": {
                await updateErrorChannel(guildId as string, channelQuery, client)

                await client.Reply("Set log", "✅", `The log channel is now : ${channelQuery}`)

                break;
            }
            default: {
                return client.Reply("Commmand log", "❌", "Error while updating the channel", true)
            }
        }
    }
}