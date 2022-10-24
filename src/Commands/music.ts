import { QueueRepeatMode } from "discord-player";
import {ApplicationCommandOptionType, ChatInputCommandInteraction, GuildMember, GuildResolvable} from "discord.js";
import { Bot } from "src/Structures/Bot";


module.exports = {

    name: "music",
    description: "music manager",
    options: [
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "play",
            description: "play a song",
            options: [
                {
                    type: ApplicationCommandOptionType.String,
                    name: "name",
                    description: "song name or url",
                    required: true
                }
            ]
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "stop",
            description: "stop the music",
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "skip",
            description: "skip the track",
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "pause",
            description: "pause the track",
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "resume",
            description: "resume the track",
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "shuffle",
            description: "shuffle the queue",
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "queue",
            description: "display the actual queue",
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "nowplaying",
            description: "Display the actual song"
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "back",
            description: "return to the previous track"
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "clear",
            description: "clear the queue"
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "testing",
            description: "do not publish that"
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "info",
            description: "Shwo info about hte current track"
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "spotify",
            description: "spotify playlist",
            options: [
                {
                    type: ApplicationCommandOptionType.String,
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
                    type: ApplicationCommandOptionType.String,
                    name: "name",
                    description: "name of the research",
                    required: true,
                }
            ]
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "skip_to",
            description: "skip to a certain the track",
            options: [
                {
                    type: ApplicationCommandOptionType.Integer,
                    name: "position",
                    description: "position to the track in the queue 0 - n",
                    required: true
                }
            ]
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "insert",
            description: "insert a track",
            options: [
                {
                    type: ApplicationCommandOptionType.String,
                    name: "name",
                    description: "song name or url",
                    required: true
                },
                {
                    type: ApplicationCommandOptionType.Integer,
                    name: "index",
                    description: "index",
                    required: true
                }
            ]
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "seek",
            description: "Seek to the given time",
            options: [
                {
                    type: ApplicationCommandOptionType.Integer,
                    name: "time",
                    description: "time (in seconde)",
                    required: true
                }
            ]
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "volume",
            description: "set the volume of the track",
            options:
            [
                {
                    type: ApplicationCommandOptionType.Integer,
                    name: "set",
                    description: "volume (0 - 100)",
                    required: true
                },
            ]
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "playnext",
            description: "add a song to the top af the queue",
            options: [
                {
                    type: ApplicationCommandOptionType.String,
                    name: "name",
                    description: "song name or url",
                    required: true
                }
            ]
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "bassboost",
            description: "set the bassboost filter",
            options: [
                {
                    type: ApplicationCommandOptionType.Boolean,
                    name: "enable",
                    description: "enable or disable the filter",
                    required: true
                }
            ]
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "8d",
            description: "set the 8D filter (can be sad with ultra boosted music)",
            options: [
                {
                    type: ApplicationCommandOptionType.Boolean,
                    name: "enable",
                    description: "enable or disable the filter",
                    required: true
                }
            ]
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "loop",
            description: "Set a loop mode",
            options: [
                {
                    type: ApplicationCommandOptionType.Integer,
                    name: "type",
                    description: "type of loop mode",
                    required: true,
                    choices: [
                        {
                            name: 'Off',
                            value: QueueRepeatMode.OFF
                        },
                        {
                            name: 'Track',
                            value: QueueRepeatMode.TRACK
                        },
                        {
                            name: 'Queue',
                            value: QueueRepeatMode.QUEUE
                        },
                        {
                            name: 'Autoplay',
                            value: QueueRepeatMode.AUTOPLAY
                        }
                    ]
                }
            ]
        },
    ],

    async execute(client: Bot) {

        const interaction = client.interaction

        if (!interaction) return;

        const { options, guild } = interaction as ChatInputCommandInteraction;

        if (!client.config.Guild.get(guild?.id as string)?.blindtestSession?.terminate) {
            return await interaction.reply({content: "You can't use music system with a blindtest session i'm sorry  😥", ephemeral: true})
        }

        const member = interaction.member as GuildMember

        const subcommand = options.getSubcommand();

        const queue = client.player.getQueue(guild as GuildResolvable)

        if (!member?.voice.channel) return client.Reply(interaction, `Command ${subcommand}`, "❌", "You are not in a voice channel", true);

        await require(`./musicSubcommand/${subcommand}`)(client, queue, interaction);
    }
}