"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateErrorChannel = void 0;
const Guild_1 = require("./Schema/Guild");
const updateErrorChannel = async (guildId, errorChannel) => {
    const channel = {
        id: errorChannel.id
    };
    await Guild_1.GuildDB.findOneAndUpdate({ guildId }, {
        errorChannel: channel
    }).catch(console.log);
};
exports.updateErrorChannel = updateErrorChannel;
