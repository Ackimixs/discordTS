import {ApplicationCommandOptionType, ChatInputCommandInteraction} from "discord.js";
import {Bot} from "src/Structures/Bot";

module.exports = {
    name: "blindtest",
    description: "blindtest system",
    category: "Music",
    options: [
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "add_track",
            description: "add tracks to an artist",
            options: [
                {
                    type: ApplicationCommandOptionType.String,
                    name: "artist_name",
                    description: "artist name",
                    value: "",
                    required: true
                },
                {
                    type: ApplicationCommandOptionType.String,
                    name: "track_name",
                    description: "track name",
                    required: true
                },
            ]
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "start_session",
            description: "start a blindtest session",
            options: [
                {
                    type: ApplicationCommandOptionType.Number,
                    name: "number",
                    description: "number of song to play",
                    required: true
                }
            ]
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "vote",
            description: "vote for blindtest",
            options: [
                {
                    type: ApplicationCommandOptionType.String,
                    name: "artist_name_vote",
                    description: "artist name",
                    required: true
                },
                {
                    type: ApplicationCommandOptionType.String,
                    name: "track_name_vote",
                    description: "track name",
                    required: true
                },
            ]
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "leaderboard",
            description: "Show the leaderboard of the last blindtest session",
        },
    ],

    async execute(client: Bot, interaction: ChatInputCommandInteraction) {

        await require(`./blindtest/${interaction.options.getSubcommand()}`)(client, interaction)

    }
}