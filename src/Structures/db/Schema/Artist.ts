import { Schema, model, Document } from 'mongoose';

export const ArtistSchema = new Schema<Artist>({
    artistName: String,
    tracks: Map
})

export const ArtistDB = model<Artist>('Artist', ArtistSchema)

export interface Artist extends Document {
    artistName: string,
    //tracks: [{trackUrl: string, trackName: string}]
    tracks: Map<string, string>
}