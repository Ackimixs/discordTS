import {Events, GuildMember, PartialGuildMember} from "discord.js"
import { Bot } from "src/Structures/Bot";

module.exports = {
    name: Events.GuildMemberRemove,
    once: false,

    async execute(member: GuildMember | PartialGuildMember, client: Bot) {

        const memberCoutChannelId = client.config?.Guild?.get(member.guild.id)?.memberCoutChannel?.id

        if (!memberCoutChannelId) return;

        const channel = await client.channels.fetch(memberCoutChannelId)

        if (!channel) return

        const guild = await client.guilds.fetch(member.guild.id)

        if (!guild) return

        const memberCount = guild.memberCount
        // @ts-ignore
        channel.setName(`Member count - ${memberCount}`);

    }
}