import { Bot } from "../Bot";
import {createSession} from "./Session";

const { GuildDB } = require('./Schema/Guild')

export const createGuild = async (guildId: string, client: Bot) : Promise<void> => {

    const blindtestSession = await createSession(guildId)

    const guild = new GuildDB({
        guildId,
        language: "en",
        blindtestSession
    })
    
    await guild.save();

    await client.config?.Guild?.set(guild.id,
                                    {guildId: guild.id,
                                        language: "en",
                                        blindtestSession})
}