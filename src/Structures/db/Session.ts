import {BlindtestSession, SessionUser} from "./Schema/Guild";
import {randomTrack} from "./Artist";
import {ObjectId} from "mongoose";
import { User } from "discord.js";

export const createSession = async (guildId: string): Promise<BlindtestSession> => {
    return {
        guildId,
        round: 0,
        createdAt: new Date(),
        terminate: true,
        result: new Map<string, randomTrack>(),
        member: new Map<string, SessionUser>(),
    }
}

export const createSessionUser = (user: User, guildId: string): SessionUser => {
    return {
        id: user.id,
        tag: user.tag,
        guildId,
        resultRound: new Map<string, randomTrack>(),
        point: 0
    }
}