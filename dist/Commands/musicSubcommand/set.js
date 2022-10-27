"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Guild_1 = require("../../Structures/db/Guild");
module.exports = async (client, queue, interaction) => {
    const { options, guild } = interaction;
    const fullSystem = options.getBoolean('mode');
    const guildData = client.config.Guild.get(guild?.id);
    guildData.musicSystem = fullSystem;
    await (0, Guild_1.updateGuild)(guild?.id, guildData);
    return client.Reply(interaction, "music", "✅", `the the music system to : **${fullSystem ? "full" : "min"}** \n (Ps: you have to wait maximum 1min)`);
};
