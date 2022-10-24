import { ChatInputCommandInteraction } from "discord.js";
import { Bot } from "src/Structures/Bot";
import {ClientSearchOptions} from "spotify-api.js";
import {addTracks} from "../../Structures/db/Artist";

module.exports = async (client: Bot) => {
    const interaction = client.interaction

    const { options } = interaction as ChatInputCommandInteraction

    const queryArtist = options.getString('artist_name') as string
    const queryTrack = options.getString('track_name') as string

    const Spotify = client.spotifyClient;

    // @ts-ignore
    const { tracks } = await Spotify.search(queryTrack + ' ' + queryArtist, {types: ["track"]})

    if (!tracks) return client.Reply("track recherch", "❌", `I'm sorry but track **${queryTrack}** not found`, true);

    const musicUrl = tracks[0].externalURL.spotify

    const musicName = tracks[0].name

    // @ts-ignore
    const { artists } = await Spotify.search(queryArtist, {types: ["artist"]})

    if (!artists) return client.Reply("track recherch", "❌", `I'm sorry but artist **${queryArtist}** not found`, true);

    const artistName = artists[0].name;

    await addTracks(artistName, musicName, musicUrl);

    return await client.Reply(`add track : ${musicName}`, `✅`, `Add music : ${musicName} from : **${artistName}**`)
}