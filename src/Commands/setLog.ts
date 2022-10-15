import {ApplicationCommandOptionType, Channel, ChatInputCommandInteraction, TextBasedChannel} from "discord.js";
import { Bot } from "../Structures/Bot";
import { createEmbed } from "../utils/embed";
import { updatelogChannel } from "../Structures/db/updateLogChannel";
import {updateErrorChannel} from "../Structures/db/updateErrorChannel";

module.exports = {
    //TODO only available for admin
    name: "set",
    description: "set the different logs channel",
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
        const { options, guildId } = client.interaction as ChatInputCommandInteraction

        const subCommand = options.getSubcommand()


        const channelQuery = options.getChannel("channel") as Channel

        // @ts-ignore
        //if (!member?.manageable) return client.Reply("Commmand log", "❌", "You can't use this command", true)

        if (!channelQuery || !channelQuery.isTextBased()) return client.Reply("Commmand log", "❌", "The channel provided is not a text based channel", true)

        switch (subCommand) {
            case "log": {
                await updatelogChannel(guildId as string, channelQuery)

                await client.Reply("Set log", "✅", `The log channel is now : ${channelQuery}`)

                break;
            }
            case "error": {
                await updateErrorChannel(guildId as string, channelQuery)

                await client.Reply("Set log", "✅", `The log channel is now : ${channelQuery}`)

                break;
            }
            default: {
                return client.Reply("Commmand log", "❌", "Error while updating the channel", true)
            }
        }
    }
}