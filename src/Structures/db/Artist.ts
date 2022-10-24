import {ArtistDB} from "./Schema/Artist";


export const addArtist = async (artistName: string): Promise<void> => {
    const data = new ArtistDB({
        artistName,
        tracks: new Map<string, string>()
    })

    await data.save()
}

export const addTracks = async (artistName: string, trackName: string, trackUrl: string) => {
    let data = await ArtistDB.findOne({
        artistName
    })

    if (!data) {
        data = new ArtistDB({
            artistName,
            tracks: new Map<string, string>()
        })

        data.tracks.set(trackName, trackUrl)

        await data.save()
    }
    else {

        if (!data.tracks.has(trackName)) {
            data.tracks.set(trackName, trackUrl)
            await data.save()
        }
    }
}

export const getArtist = async (artistName: string) => {
    return ArtistDB.findOne({
        artistName
    })
}

export const getTrack = async (artistName: string, trackName: string) => {
    const data = await ArtistDB.findOne({
        artistName
    })

    if (!data) return null

    return data.tracks.get(trackName);
}

export const getRandomArtist = async () => {
    const data = await ArtistDB.find()

    return data[Math.floor(Math.random()*data.length)];
}

export const getRandomTrackName = async (artistName: string): Promise<{trackName: string; trackUrl: string | undefined;} | undefined> => {
    const artist = await ArtistDB.findOne({artistName})

    if (!artist) return undefined

    let keys = Array.from(artist.tracks.keys());
    let key = keys[Math.floor(Math.random() * keys.length)];

    return {trackName: key, trackUrl: artist.tracks.get(key)}
}

export const getRandomTrack = async (): Promise<randomTrack | null> => {
    //TODO werify random because now is always the same track (just have more track)
    const artist = await getRandomArtist();
    const artistName = artist.artistName
    const track = await getRandomTrackName(artistName);
    if (!track|| !track.trackName || !track.trackUrl) return null;
    return {
        artistName,
        trackName: track.trackName,
        trackUrl: track.trackUrl
    }
}


export interface randomTrack {
    artistName: string,
    trackName: string,
    trackUrl: string
}