"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionUserDB = exports.SessionUserSchema = void 0;
const mongoose_1 = require("mongoose");
exports.SessionUserSchema = new mongoose_1.Schema({
    _id: String,
    sessionId: String,
    guildId: String,
    resultRound: (Map)
});
exports.SessionUserDB = (0, mongoose_1.model)("SessionUser", exports.SessionUserSchema);
