import { Schema, model } from "mongoose";
import { randomTrack } from "../Artist";
import {SessionUser} from "./SessionUser";

export const SessionSchema = new Schema<Session>({
    _id: String,
    guildId: String,
    terminate: Boolean,
    round: Number,
    createdAt: Date,
    result: Object,
    member: Object,
})

export const SessionDB = model<Session>('Session', SessionSchema);

export interface Session {
    _id: string,
    guildId: string,
    terminate: boolean,
    round: number,
    createdAt: Date,
    result: Map<string, randomTrack>
    member: Map<string, SessionUser>
}