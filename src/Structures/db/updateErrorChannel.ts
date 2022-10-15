import { Channel } from "discord.js";
import { Bot } from "../Bot";
import { GuildDB } from "./Schema/Guild";


export const updateErrorChannel = async (guildId: string, errorChannel: Channel, client: Bot): Promise<void> => {

    const channel = {
        id: errorChannel.id
    }

    await GuildDB.findOneAndUpdate({guildId}, {
        errorChannel: channel
    })

    const guild = client.config.Guild.get(guildId)

    if (!guild) return

    guild.errorChannel = channel
}