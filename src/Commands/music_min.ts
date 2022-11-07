import {QueueRepeatMode} from "discord-player";
import {ApplicationCommandOptionType, ChatInputCommandInteraction, GuildMember, GuildResolvable} from "discord.js";
import {Bot} from "src/Structures/Bot";


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
            name: "queue",
            description: "display the actual queue",
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "nowplaying",
            description: "Display the actual song"
        },
        ],

    async execute(client: Bot, interaction: ChatInputCommandInteraction) {

        const { options, guild } = interaction;

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