"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const leaderBoardEmebd_1 = require("../../utils/leaderBoardEmebd");
module.exports = async (client, interaction) => {
    const { guild, channel } = interaction;
    await interaction.deferReply({ ephemeral: true });
    const session = client.config.Guild.get(guild?.id)?.blindtestSession;
    if (!session) {
        return client.editReply(interaction, "leaderboard", "❌", "i'm sorry but i don't find the last blindtest session");
    }
    if (!session.terminate) {
        return client.editReply(interaction, "leaderboard", "❌", "A blindtest is running on your server");
    }
    await client.editReply(interaction, "Leaderboard", "⏳", "I search the last game ...");
    const embed = await (0, leaderBoardEmebd_1.BlindtestLeaderboardEmbed)(session, client);
    embed.setTimestamp(session.createdAt);
    await channel?.send({ embeds: [embed] });
};
