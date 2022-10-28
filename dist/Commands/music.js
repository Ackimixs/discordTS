"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_player_1 = require("discord-player");
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
            name: "testing",
            description: "do not publish that"
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            name: "info",
            description: "Shwo info about hte current track"
        },
        {
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            name: "spotify",
            description: "spotify playlist",
            options: [
                {
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    name: "type",
                    description: "type of search",
                    required: true,
                    choices: [
                        {
                            name: "album",
                            value: "album"
                        },
                        {
                            name: "track",
                            value: "track"
                        },
                        {
                            name: "episode",
                            value: "episode"
                        }
                    ]
                },
                {
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    name: "name",
                    description: "name of the research",
                    required: true,
                }
            ]
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
        {
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            name: "loop",
            description: "Set a loop mode",
            options: [
                {
                    type: discord_js_1.ApplicationCommandOptionType.Integer,
                    name: "type",
                    description: "type of loop mode",
                    required: true,
                    choices: [
                        {
                            name: 'Off',
                            value: discord_player_1.QueueRepeatMode.OFF
                        },
                        {
                            name: 'Track',
                            value: discord_player_1.QueueRepeatMode.TRACK
                        },
                        {
                            name: 'Queue',
                            value: discord_player_1.QueueRepeatMode.QUEUE
                        },
                        {
                            name: 'Autoplay',
                            value: discord_player_1.QueueRepeatMode.AUTOPLAY
                        }
                    ]
                }
            ]
        },
    ],
    async execute(client, interaction) {
        const { options, guild } = interaction;
        if (!client.config.Guild.get(guild?.id)?.blindtestSession?.terminate) {
            return await interaction.reply({ content: "You can't use music system with a blindtest session i'm sorry  😥", ephemeral: true });
        }
        const member = interaction.member;
        const subcommand = options.getSubcommand();
        const queue = client.player.getQueue(guild);
        if (!member?.voice.channel)
            return client.Reply(interaction, `Command ${subcommand}`, "❌", "You are not in a voice channel", true);
        await require(`./musicSubcommand/${subcommand}`)(client, queue, interaction);
    }
};
