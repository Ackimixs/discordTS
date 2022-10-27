"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSessionUser = exports.getSessionUser = void 0;
const SessionUser_1 = require("./Schema/SessionUser");
const getSessionUser = async (userId, sessionId) => {
    return SessionUser_1.SessionUserDB.findOne({
        _id: userId,
        sessionId
    });
};
exports.getSessionUser = getSessionUser;
const createSessionUser = async (userId, sessionId, guildId) => {
    const test = await SessionUser_1.SessionUserDB.find({ _id: userId });
    if (test) {
        test.forEach(user => {
            user.delete();
        });
    }
    const data = new SessionUser_1.SessionUserDB({
        _id: userId,
        sessionId,
        guildId,
        resultRound: new Map()
    });
    await data.save();
    return data;
};
exports.createSessionUser = createSessionUser;
