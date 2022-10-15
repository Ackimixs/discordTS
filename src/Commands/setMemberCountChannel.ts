import {
    ApplicationCommandOptionType,
    Channel,
    ChatInputCommandInteraction,
    PermissionsBitField,
    VoiceChannel
} from "discord.js";
import { Bot } from "../Structures/Bot";
import {updateMemberCountChannel} from "../Structures/db/updateMemberCountChannel";


module.exports = {
    name: "member_count",
    description: "set the member count channel",
    defaultMemberPermissions: PermissionsBitField.StageModerator,
    options: [

            {
                type: ApplicationCommandOptionType.Channel,
                name: "channel",
                description: "channel",
                required: true
            }
    ],

    async execute(client: Bot) {
        const { options, guildId, member, guild } = client.interaction as ChatInputCommandInteraction



        const channelQuery = options.getChannel("channel") as VoiceChannel

        // @ts-ignore
        if (!member?.permissions.has(PermissionsBitField.StageModerator)) return;

        await updateMemberCountChannel(guildId as string, channelQuery, client)


        const memberCount = guild?.memberCount.toString()

        if (!memberCount) return;

        await channelQuery.setName(`Member count - ${memberCount}`)


        await client.Reply("Set log", "✅", `The member count channel is now : ${channelQuery}`)


    }
}