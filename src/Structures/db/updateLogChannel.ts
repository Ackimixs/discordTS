import { Channel } from "discord.js";
import { Bot } from "../Bot";
import { GuildDB} from "./Schema/Guild";


export const updatelogChannel = async (guildId: string, logChannel: Channel, client: Bot): Promise<void> => {

    const channel = {
        id: logChannel.id
    }

    await GuildDB.findOneAndUpdate({guildId}, {
        logChannel: channel
    })

    const guild = client.config.Guild.get(guildId)

    if (!guild) return

    guild.logChannel = channel
}