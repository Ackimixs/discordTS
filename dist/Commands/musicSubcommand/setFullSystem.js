"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = async (client, queue, interaction) => {
    const { options, guild } = interaction;
    const fullSystem = options.getBoolean('mode');
    const guildData = client.config.Guild.get(guild?.id);
    guildData.musicSystem = fullSystem;
    return client.Reply(interaction, "music", "✅", `the the music system to : **${fullSystem ? "full" : "min"}**`);
};
