import { GuildMember, InteractionType} from "discord.js"
import { Bot } from "src/Structures/Bot";

module.exports = {
    name: 'guildMemberAdd',
    once: false,

    async execute(member: GuildMember, client: Bot) {

        const memberCoutChannelId = client.config?.Guild?.get(member.guild.id)?.memberCoutChannel?.id

        if (!memberCoutChannelId) return;

        const channel = await client.channels.fetch(memberCoutChannelId)

        if (!channel) return

        const guild = await client.guilds.fetch(member.guild.id)

        if (!guild) return

        // @ts-ignore
        channel.setName(guild.memberCount.toString());

    }
}