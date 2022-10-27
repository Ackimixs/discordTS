"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmbed = void 0;
const discord_js_1 = require("discord.js");
const createEmbed = async (client) => {
    return new discord_js_1.EmbedBuilder().setColor(client.config.color).setTimestamp().setFooter({
        text: `Made with ♡ by an other guys`,
        iconURL: client.user?.avatarURL()
    });
};
exports.createEmbed = createEmbed;
