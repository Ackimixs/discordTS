"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionDB = exports.SessionSchema = void 0;
const mongoose_1 = require("mongoose");
exports.SessionSchema = new mongoose_1.Schema({
    guildId: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    terminate: {
        type: mongoose_1.Schema.Types.Boolean,
        default: true,
    },
    round: {
        type: mongoose_1.Schema.Types.Number,
        default: 0
    },
    createdAt: {
        type: mongoose_1.Schema.Types.Date,
        defaultl: Date.now()
    },
    result: {
        type: mongoose_1.Schema.Types.Map,
        required: false,
    },
    member: {
        type: mongoose_1.Schema.Types.Map,
        required: false
    },
});
exports.SessionDB = (0, mongoose_1.model)('Session', exports.SessionSchema);
