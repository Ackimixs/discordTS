import {
    ApplicationCommandOptionType,
    Channel,
    ChatInputCommandInteraction,
    PermissionsBitField, TextChannel, VoiceChannel,
} from "discord.js";
import {Bot} from "../Structures/Bot";
import {updateMemberCountChannel} from "../Structures/db/Guild";


module.exports = {
    name: "member_count",
    description: "set the member count channel",
    defaultMemberPermissions: PermissionsBitField.StageModerator,
    options: [
        {
            type: ApplicationCommandOptionType.Boolean,
            name: "enable",
            description: "set enable or disable the member count channel",
            required: true
        },
        {
            type: ApplicationCommandOptionType.Channel,
            name: "channel",
            description: "channel",
            required: false
        },
    ],

    async execute(client: Bot, interaction: ChatInputCommandInteraction) {

        const { options, guildId, guild } = interaction

        const lastChannel = client.config.Guild.get(guildId as string)?.memberCoutChannel;

        if (lastChannel && lastChannel.id && lastChannel.lastName.length > 1) {
            const channel = await client.channels.fetch(lastChannel?.id as string) as VoiceChannel | TextChannel
            if (channel) {
                await channel.setName(lastChannel.lastName)
            }
        }

        const channelQuery = options.getChannel("channel") as Channel
        const enable = options.getBoolean("enable") as boolean

        if (enable && !channelQuery) {
            return client.Reply(interaction, "set log", "❌", "You have to input a channel if you want to set on the member count display", true)
        }

        await updateMemberCountChannel(guildId as string, channelQuery, enable, client);


        if (enable) {
            const memberCount = guild?.memberCount.toString()

            if (!memberCount) return;
            // @ts-ignore
            await channelQuery.setName(`Member count - ${memberCount}`)
        }

        await client.Reply(interaction, "Set log", "✅", `The member count channel is now ${enable ? `set on : **${channelQuery}**` : '**disable**'}`, true)
    }
}