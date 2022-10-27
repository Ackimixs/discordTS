import {createSession} from "./Session";
import {GuildBot} from "./Schema/Guild";
import { Channel } from "discord.js";
import { Bot } from "../Bot";
const { GuildDB } = require('./Schema/Guild')

export const createGuild = async (guildId: string) : Promise<GuildBot> => {

    const blindtestSession = await createSession(guildId)

    const guild = new GuildDB({
        guildId,
        language: "en",
        blindtestSession,
        musicSystem: false,
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

export const updatelogChannel = async (guildId: string, logChannel: Channel, enable: boolean, client: Bot): Promise<void> => {

    const channel = {
        id: enable ? logChannel.id : "",
        enable
    }

    await GuildDB.findOneAndUpdate({guildId}, {
        logChannel: channel
    })

    const guild = client.config.Guild.get(guildId)

    if (!guild) return

    guild.logChannel = channel
}

export const updateMemberCountChannel = async (guildId: string, memberCount: Channel, enable: boolean, client: Bot): Promise<void> => {

    const channel = {
        id: enable ? memberCount.id : "",
        enable
    }

    await GuildDB.findOneAndUpdate({guildId}, {
        memberCoutChannel: channel
    })

    const guild = client.config.Guild.get(guildId)

    if (!guild) return

    guild.memberCoutChannel = channel
}

export const updateErrorChannel = async (guildId: string, errorChannel: Channel, enable: boolean, client: Bot): Promise<void> => {

    const channel = {
        id: enable ? errorChannel.id : "",
        enable
    }

    await GuildDB.findOneAndUpdate({guildId}, {
        errorChannel: channel
    })

    const guild = client.config.Guild.get(guildId)

    if (!guild) return

    guild.errorChannel = channel
}