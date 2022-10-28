"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    name: "blindtest",
    description: "blindtest system",
    category: "Music",
    options: [
        {
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            name: "add_track",
            description: "add tracks to an artist",
            options: [
                {
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    name: "artist_name",
                    description: "artist name",
                    value: "",
                    required: true
                },
                {
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    name: "track_name",
                    description: "track name",
                    required: true
                },
            ]
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            name: "start_session",
            description: "start a blindtest session",
            options: [
                {
                    type: discord_js_1.ApplicationCommandOptionType.Number,
                    name: "number",
                    description: "number of song to play",
                    required: true
                }
            ]
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            name: "vote",
            description: "vote for blindtest",
            options: [
                {
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    name: "artist_name_vote",
                    description: "artist name",
                    required: true
                },
                {
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    name: "track_name_vote",
                    description: "track name",
                    required: true
                },
            ]
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            name: "leaderboard",
            description: "Show the leaderboard of the last blindtest session",
        },
    ],
    async execute(client, interaction) {
        await require(`./blindtest/${interaction.options.getSubcommand()}`)(client, interaction);
    }
};
