import { ChatInputCommandInteraction } from "discord.js";
import { Bot } from "src/Structures/Bot";
import { BlindtestLeaderboardEmbed } from "./start_session";

module.exports = async (client: Bot, interaction: ChatInputCommandInteraction) => {
    const { guild } = interaction

    await interaction.deferReply({ephemeral: true})

    const session = client.config.Guild.get(guild?.id as string)?.blindtestSession

    if (!session) {
        return client.editReply(interaction, "leaderboard", "❌", "i'm sorry but i don't find the last blindtest session")
    }

    await client.editReply(interaction,"Leaderboard", "⏳", "I search the last game ...")

    const embed = await BlindtestLeaderboardEmbed(session, client)

    await interaction.followUp({embeds: [embed]})
}