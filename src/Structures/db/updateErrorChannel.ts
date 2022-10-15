import { Channel } from "discord.js";
import { GuildDB } from "./Schema/Guild";


export const updateErrorChannel = async (guildId: string, errorChannel: Channel): Promise<void> => {

    const channel = {
        id: errorChannel.id
    }

    await GuildDB.findOneAndUpdate({guildId}, {
        errorChannel: channel
    }).catch(console.log)
}