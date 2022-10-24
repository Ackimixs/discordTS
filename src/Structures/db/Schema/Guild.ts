import { Schema, model } from 'mongoose';
import { Session } from './Session';

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
    },
    blindtestSession: Object
})

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
    },
    blindtestSession?: Session
}