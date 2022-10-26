import { Schema, model, ObjectId } from 'mongoose';
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
        }
    },
    errorChannel: {
        id: {
            type: Schema.Types.String
        }
    },
    memberCoutChannel: {
        id: {
            type: Schema.Types.String
        }
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
    blindtestSession: BlindtestSession
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