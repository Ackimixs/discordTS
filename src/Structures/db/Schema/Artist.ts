import { Schema, model, Document } from 'mongoose';

export const ArtistSchema = new Schema<Artist>({
    artistName: {
        type: Schema.Types.String,
        index: true,
        required: true
    },
    tracks: {
        type: Schema.Types.Map,
        required: true,
        default: null
    }
})

export const ArtistDB = model<Artist>('Artist', ArtistSchema)

export interface Artist extends Document {
    artistName: string,
    //tracks: [{trackUrl: string, trackName: string}]
    tracks: Map<string, string>
}