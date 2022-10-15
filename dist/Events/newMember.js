"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    name: 'guildMemberAdd',
    once: false,
    async execute(member, client) {
        const memberCoutChannelId = client.config?.Guild?.get(member.guild.id)?.memberCoutChannel?.id;
        if (!memberCoutChannelId)
            return;
        const channel = await client.channels.fetch(memberCoutChannelId);
        if (!channel)
            return;
        const guild = await client.guilds.fetch(member.guild.id);
        if (!guild)
            return;
        channel.setName(guild.memberCount.toString());
    }
};
