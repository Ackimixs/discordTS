const { GuildDB } = require('./Schema/Guild')

export const getGuild = async (guildId: string) => {
    return GuildDB.findOne({
        guildId
    });
}