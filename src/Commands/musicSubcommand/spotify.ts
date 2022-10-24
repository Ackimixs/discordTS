import {ChatInputCommandInteraction, GuildResolvable} from "discord.js";

import {Queue} from "discord-player";
import { Bot } from "src/Structures/Bot";
import {createEmbed} from "../../utils/embed";
import { Album, ClientSearchOptions, Episode, SearchType, Track } from "spotify-api.js";

module.exports = async (client: Bot, queue: Queue, interaction: ChatInputCommandInteraction): Promise<void> => {

    const { options, user, guild, channel, member } = interaction

    await interaction?.deferReply();

    const spotifyClient = client.spotifyClient

    const query = options.getString('name') as string

    const type = options.getString('type') as SearchType

    const option: ClientSearchOptions = { types: [type], limit: 1 }

    const { albums, tracks, episodes } = await spotifyClient.search(query, option);

    const musicUrl: any = albums ? albums : tracks ? tracks : episodes ? episodes : null

    if (!musicUrl || !musicUrl[0]) return await client.editReply(interaction, "Music command", "❌", `I'm sorry but track **${query}** not found`);

    let url: string = musicUrl[0].externalURL?.spotify

    if (!queue) {
        queue = await client.player.createQueue(guild as GuildResolvable, {
            metadata: {
                channel: channel,
                leaveOnEmptyCooldown: 100,
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

    if (!url) return;

    const tracksPlayer = await client.player.search(url, {
        requestedBy: user,
    })

    if (!tracksPlayer || !tracksPlayer.tracks.length) return await client.editReply(interaction, "Music command", "❌", `I'm sorry but track **${query}** not found`);


    tracksPlayer.playlist ? queue.addTracks(tracksPlayer.tracks) : queue.addTrack(tracksPlayer.tracks[0]);
    if (!queue.playing) await queue.play();


    const embed = await createEmbed(client)
    embed.setImage(tracksPlayer.tracks[0].thumbnail)
    .setTitle("✅ | Add to queue - **" + tracksPlayer.tracks[0].title + "**")
    .setDescription(`By : ${tracksPlayer.tracks[0].author} | duration : ${tracksPlayer.tracks[0].duration} | request by ${tracksPlayer.tracks[0].requestedBy}`)
    .setURL(tracksPlayer.tracks[0].url)

    
    await interaction.editReply({embeds: [embed]})
}