"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_player_1 = require("discord-player");
module.exports = async (client, queue) => {
    if (!client.interaction)
        return;
    const { options, user, guild, channel, member } = client.interaction;
    queue = await client.player.createQueue(guild, {
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
            await queue.connect(member.voice.channel);
        }
    }
    catch (err) {
        client.player.deleteQueue(guild);
        return await client.Reply("Error music", "❌", "Could not join your voice channel!", true);
    }
    const tracks = await client.player.search("https://open.spotify.com/playlist/5cpKaHtZrynMYtA2FvXfo8?si=dfe25b6043fe4930", {
        requestedBy: user,
    });
    if (!tracks || !tracks.tracks.length)
        return await client.Reply("Music command", "❌", `that can't be deleted`, true);
    tracks.playlist ? queue.addTracks(tracks.tracks) : queue.addTrack(tracks.tracks[0]);
    queue.shuffle();
    await queue.setFilters({
        normalizer: true,
        bassboost_low: true
    });
    if (!queue.playing) {
        await queue.play();
    }
    queue.setRepeatMode(discord_player_1.QueueRepeatMode.QUEUE);
    queue.skip();
    return client.Reply("Oops", "👹", "You want to play lets play", true);
};
