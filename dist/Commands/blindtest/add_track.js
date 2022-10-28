"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Artist_1 = require("../../Structures/db/Artist");
module.exports = async (client, interaction) => {
    const { options } = interaction;
    const queryArtist = options.getString('artist_name');
    const queryTrack = options.getString('track_name');
    const Spotify = client.spotifyClient;
    const { tracks } = await Spotify.search(queryTrack + ' ' + queryArtist, { types: ["track"] });
    if (!tracks)
        return client.Reply(interaction, "track recherch", "❌", `I'm sorry but track **${queryTrack}** not found`, true);
    const musicUrl = tracks[0].externalURL.spotify;
    const musicName = tracks[0].name;
    const { artists } = await Spotify.search(queryArtist, { types: ["artist"] });
    if (!artists)
        return client.Reply(interaction, "track recherch", "❌", `I'm sorry but artist **${queryArtist}** not found`, true);
    const artistName = artists[0].name;
    await (0, Artist_1.addTracks)(artistName, musicName, musicUrl);
    return await client.Reply(interaction, `add track : ${musicName}`, `✅`, `Add music : ${musicName} from : **${artistName}**`);
};
