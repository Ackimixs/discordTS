import { Schema, model, Document } from "mongoose";
import {randomTrack} from "../Artist";

export const SessionUserSchema = new Schema<SessionUser>({
    _id: String,
    sessionId: String,
    guildId: String,
    resultRound: Map<String, randomTrack>
})

export const SessionUserDB = model<SessionUser>("SessionUser", SessionUserSchema)

export interface SessionUser extends Document {
    _id: string,
    sessionId: string,
    guildId: string,
    //resultRound: [{userResult: string, round: string}]
    resultRound: Map<string, randomTrack>
}