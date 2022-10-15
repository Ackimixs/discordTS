import { Channel } from "discord.js";
import { Schema, model } from 'mongoose';

export const Guild = new Schema<GuildBot>({
    guildId: String,

    logChannel: {
        id: String
    },
    errorChannel: {
        id: String
    }
})

// @ts-ignore
export const GuildDB = model<GuildBot>('Guild', Guild)

export interface GuildBot {
    guildId: string

    logChannel?: {
        id?: string,
    }
    errorChannel?: {
        id?: string,
    }
}
