import { Schema, model } from 'mongoose';

export const Guild = new Schema<GuildBot>({
    guildId: String,
    language: String,
    logChannel: {
        id: String
    },
    errorChannel: {
        id: String
    },
    memberCoutChannel: {
        id: String
    }
})

// @ts-ignore
export const GuildDB = model<GuildBot>('Guild', Guild)

export interface GuildBot {
    guildId: string
    language: string,
    logChannel?: {
        id?: string,
    }
    errorChannel?: {
        id?: string,
    },

    memberCoutChannel?: {
        id?: string,
    }
}