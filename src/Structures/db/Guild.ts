import {createSession} from "./Session";
import {BlindtestSession, GuildBot, SessionUser} from "./Schema/Guild";
import { Channel } from "discord.js";
import { Bot } from "../Bot";
import {randomTrack} from "./Artist";
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

export const deleteGuild = async (guildId: string): Promise<boolean> => {
    return GuildDB.findOneAndDelete({guildId})
}

export const getAllGuild = async (): Promise<GuildBot[]> => {
    const data: GuildBot[] = await GuildDB.find()

    for (let guild of data) {
        guild.blindtestSession.member = new Map<string, SessionUser>(Object.entries(guild.blindtestSession.member))
        guild.blindtestSession.result = new Map<string, randomTrack>(Object.entries(guild.blindtestSession.result))
    }

    return data;
}

export const getGuild = async (guildId: string): Promise<GuildBot> => {
    const guild: GuildBot = await GuildDB.findOne({
        guildId
    });

    guild.blindtestSession.member = new Map<string, SessionUser>(Object.entries(guild.blindtestSession.member))
    guild.blindtestSession.result = new Map<string, randomTrack>(Object.entries(guild.blindtestSession.result))

    return guild;
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
        enable,
        // @ts-ignore
        lastName: memberCount.name
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