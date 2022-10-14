import { Queue, QueueRepeatMode } from "discord-player";
import { Bot } from "src/Structures/Bot";
import {ChatInputCommandInteraction, EmbedBuilder, GuildResolvable} from "discord.js";

module.exports = async (client: Bot, queue: Queue): Promise<void> => {

    if (!client.interaction) return;

    const { options, user, guild, channel, member } = client.interaction as ChatInputCommandInteraction;

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

    try {
        if (!queue.connection) {
            // @ts-ignore
            await queue.connect(member.voice.channel)
        }
    } catch (err) {
        client.player.deleteQueue(guild as GuildResolvable)
        return await client.Reply("Error music", "❌", "Could not join your voice channel!", true);
    }

    const tracks = await client.player.search("https://open.spotify.com/playlist/5cpKaHtZrynMYtA2FvXfo8?si=dfe25b6043fe4930", {
        requestedBy: user,
    })

    if (!tracks || !tracks.tracks.length) return await client.Reply("Music command", "❌", `that can't be deleted`, true);


    tracks.playlist ? queue.addTracks(tracks.tracks) : queue.addTrack(tracks.tracks[0]);

    queue.shuffle()

    await queue.setFilters({
        normalizer: true,
        bassboost_low: true
    })

    if (!queue.playing) {
        await queue.play();
    }

    queue.setRepeatMode(QueueRepeatMode.QUEUE);

    queue.skip()

    await client.interaction.reply({content: "You want to play lets play", ephemeral: true});

}