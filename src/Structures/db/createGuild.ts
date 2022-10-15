import { Bot } from "../Bot";

const { GuildDB } = require('./Schema/Guild')

export const createGuild = async (guildId: string, client: Bot) : Promise<void> => {
    const guild = new GuildDB({
        guildId,
        language: "en"
    })
    
    await guild.save();

    await client.config?.Guild?.set(guild.id, {guildId: guild.id, language: "en"})
}