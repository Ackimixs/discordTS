"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildDB = exports.Guild = void 0;
const mongoose_1 = require("mongoose");
exports.Guild = new mongoose_1.Schema({
    guildId: String,
    language: String,
    logChannel: {
        id: String
    },
    errorChannel: {
        id: String
    },
    memberCoutChannel: {
        id: String
    }
});
exports.GuildDB = (0, mongoose_1.model)('Guild', exports.Guild);
