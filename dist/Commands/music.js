"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    name: "music",
    description: "music manager",
    options: [
        {
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            name: "play",
            description: "play a song",
            options: [
                {
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    name: "name",
                    description: "song name or url",
                    required: true
                }
            ]
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            name: "stop",
            description: "stop the music",
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            name: "skip",
            description: "skip the track",
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            name: "pause",
            description: "pause the track",
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            name: "resume",
            description: "resume the track",
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            name: "shuffle",
            description: "shuffle the queue",
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            name: "queue",
            description: "display the actual queue",
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            name: "nowplaying",
            description: "Display the actual song"
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            name: "back",
            description: "return to the previous track"
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            name: "clear",
            description: "clear the queue"
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            name: "skip_to",
            description: "skip to a certain the track",
            options: [
                {
                    type: discord_js_1.ApplicationCommandOptionType.Integer,
                    name: "position",
                    description: "position to the track in the queue 0 - n",
                    required: true
                }
            ]
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            name: "insert",
            description: "insert a track",
            options: [
                {
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    name: "name",
                    description: "song name or url",
                    required: true
                },
                {
                    type: discord_js_1.ApplicationCommandOptionType.Integer,
                    name: "index",
                    description: "index",
                    required: true
                }
            ]
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            name: "seek",
            description: "Seek to the given time",
            options: [
                {
                    type: discord_js_1.ApplicationCommandOptionType.Integer,
                    name: "time",
                    description: "time (in seconde)",
                    required: true
                }
            ]
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            name: "volume",
            description: "set the volume of the track",
            options: [
                {
                    type: discord_js_1.ApplicationCommandOptionType.Integer,
                    name: "set",
                    description: "volume (0 - 100)",
                    required: true
                },
            ]
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            name: "playnext",
            description: "add a song to the top af the queue",
            options: [
                {
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    name: "name",
                    description: "song name or url",
                    required: true
                }
            ]
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            name: "bassboost",
            description: "set the bassboost filter",
            options: [
                {
                    type: discord_js_1.ApplicationCommandOptionType.Boolean,
                    name: "enable",
                    description: "enable or disable the filter",
                    required: true
                }
            ]
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            name: "8d",
            description: "set the 8D filter (can be sad with ultra boosted music)",
            options: [
                {
                    type: discord_js_1.ApplicationCommandOptionType.Boolean,
                    name: "enable",
                    description: "enable or disable the filter",
                    required: true
                }
            ]
        },
    ],
    async execute(client) {
        const interaction = client.interaction;
        if (!interaction)
            return;
        const { options, guild, member } = interaction;
        const subcommand = options.getSubcommand();
        const queue = client.player.getQueue(guild);
        if (!member?.voice.channel)
            return client.Reply(`Command ${subcommand}`, "❌", "You are not in a voice channel", true);
        await require(`./musicSubcommand/${subcommand}`)(client, queue);
    }
};
