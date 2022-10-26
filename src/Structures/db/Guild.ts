import {createSession} from "./Session";
import {GuildBot} from "./Schema/Guild";
const { GuildDB } = require('./Schema/Guild')

export const createGuild = async (guildId: string) : Promise<GuildBot> => {

    const blindtestSession = await createSession(guildId)

    const guild = new GuildDB({
        guildId,
        language: "en",
        blindtestSession
    })

    await guild.save();

    return guild;
}

export const getGuild = async (guildId: string) => {
    return GuildDB.findOne({
        guildId
    });
}

export const updateGuild = async (guildId: string, guild: GuildBot) => {
    return GuildDB.findOneAndUpdate({guildId}, {...guild})
}