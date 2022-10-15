const { GuildDB } = require('./Schema/Guild')

export const createGuild = async (guildId: string) : Promise<void> => {
    const guild = new GuildDB({
        guildId
    })
    
    await guild.save();
}