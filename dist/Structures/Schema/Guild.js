"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { model, Schema } = require('mongoose');
module.exports = model("Guild", new Schema({
    guildId: String,
    logChannel: {
        chanel: Object,
        channelId: String
    },
    errorChannel: {
        chanel: Object,
        channelId: String
    }
}));
