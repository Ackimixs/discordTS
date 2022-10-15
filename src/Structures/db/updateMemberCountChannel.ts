import { Channel } from "discord.js";
import { Bot } from "../Bot";
import { GuildDB} from "./Schema/Guild";


export const updateMemberCountChannel = async (guildId: string, memberCount: Channel, client: Bot): Promise<void> => {

    const channel = {
        id: memberCount.id
    }

    await GuildDB.findOneAndUpdate({guildId}, {
        memberCoutChannel: channel
    })

    const guild = client.config.Guild.get(guildId)

    if (!guild) return

    guild.memberCoutChannel = channel
}