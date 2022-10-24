import { Queue } from "discord-player";
import { Bot } from "src/Structures/Bot";
import {ChatInputCommandInteraction, EmbedBuilder, GuildResolvable} from "discord.js";

module.exports = async (client: Bot, queue: Queue, interaction: ChatInputCommandInteraction): Promise<void> => {

    if (!interaction) return;

    await interaction.deferReply()

    const { options, user, guild, channel, member } = interaction

    if (!queue) {
        queue = await client.player.createQueue(guild as GuildResolvable, {
            metadata: {
                channel: channel,
                leaveOnEmptyCooldown: 1000,
                leaveOnStop: true
            },
            ytdlOptions: {
                filter: 'audioonly',
                highWaterMark: 1 << 30,
                dlChunkSize: 0,
            },
        });
    }

    try {
        if (!queue.connection) {
            // @ts-ignore
            await queue.connect(member.voice.channel)
        }
    } catch (err) {
        client.player.deleteQueue(guild as GuildResolvable)
        return await client.editReply(interaction, "Error music", "❌", "Could not join your voice channel!");
    }

    const query = options.getString("name")

    if (!query) return;

    const tracks = await client.player.search(query, {
        requestedBy: user,
    })

    if (!tracks || !tracks.tracks.length) return await client.editReply(interaction, "Music command", "❌", `I'm sorry but track **${query}** not found`);


    tracks.playlist ? queue.addTracks(tracks.tracks) : queue.addTrack(tracks.tracks[0]);
    if (!queue.playing) await queue.play();


    const embed = new EmbedBuilder()
    .setImage(tracks.tracks[0].thumbnail)
    .setTitle("✅ | Add to queue - **" + tracks.tracks[0].title + "**")
    .setDescription(`By : ${tracks.tracks[0].author} | duration : ${tracks.tracks[0].duration} | request by ${tracks.tracks[0].requestedBy}`)
    .setColor(client.config.color)
    .setURL(tracks.tracks[0].url)

    await interaction.editReply({embeds: [embed]})

}