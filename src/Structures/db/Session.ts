import { SessionDB } from "./Schema/Session";
import { v4 as uuidV4 } from 'uuid';
import {randomTrack} from "./Artist";

export const getSessionFromGuildId = async (guildId: string) => {
    return SessionDB.findOne({
        guildId
    })
}

export const createSession = async (guildId: string) => {
    const data = new SessionDB({
        guildId,
        _id: uuidV4(),
        terminate: false,
        round: 0,
        createdAt: Date.now(),
        result: new Map<string, randomTrack>(),
    })

    await data.save()

    return data;
}