import { Channel } from "discord.js";
import { GuildDB} from "./Schema/Guild";


export const updatelogChannel = async (guildId: string, logChannel: Channel): Promise<void> => {

    const channel = {
        id: logChannel.id
    }

    await GuildDB.findOneAndUpdate({guildId}, {
        logChannel: channel
    })
}