import { Schema, model } from 'mongoose';
import { randomTrack } from '../Artist';

export const Guild = new Schema<GuildBot>({
    guildId: {
        type: String,
        index: true,
        required: true
    },
    language: {
        type: Schema.Types.String,
        default: "en"
    },
    logChannel: {
        id: {
            type: Schema.Types.String
        },
        enable: {
            type: Schema.Types.Boolean,
            default: false
        }
    },
    errorChannel: {
        id: {
            type: Schema.Types.String
        },
        enable: {
            type: Schema.Types.Boolean,
            default: false
        }
    },
    memberCoutChannel: {
        id: {
            type: Schema.Types.String
        },
        enable: {
            type: Schema.Types.Boolean,
            default: false
        },
        lastName: {
            type: Schema.Types.String,
            default: ""
        }
    },
    blindtestSession: Object,
    musicSystem: {
        type: Schema.Types.Boolean,
        default: false,
    }
})

export const GuildDB = model<GuildBot>('Guild', Guild)

export interface GuildBot {
    guildId: string
    language: string,
    logChannel?: {
        id: string,
        enable: boolean
    }
    errorChannel?: {
        id: string,
        enable: boolean
    },
    memberCoutChannel?: {
        id: string,
        enable: boolean,
        lastName: string
    },
    blindtestSession: BlindtestSession,
    musicSystem: boolean
}


export interface BlindtestSession {
    guildId: string,
    terminate: boolean,
    round: number,
    createdAt: Date,
    result: Map<string, randomTrack>
    member: Map<string, SessionUser>
}

export interface SessionUser {
    id: string,
    tag: string,
    guildId: string,
    resultRound: Map<string, randomTrack>
    point: number
}