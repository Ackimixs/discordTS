import {SessionUser, SessionUserDB} from "./Schema/SessionUser";
import {randomTrack} from "./Artist";

export const getSessionUser = async (userId: string, sessionId: string): Promise<SessionUser | null> => {
    return SessionUserDB.findOne({
        _id: userId,
        sessionId
    })
}

export const createSessionUser = async (userId: string, sessionId: string, guildId: string): Promise<SessionUser> => {
    const test = await SessionUserDB.find({_id: userId})

    if (test) {
        test.forEach(user => {
            user.delete()
        })
    }

    const data = new SessionUserDB({
        _id: userId,
        sessionId,
        guildId,
        resultRound: new Map<string, randomTrack>()
    })

    await data.save()

    return data;
}