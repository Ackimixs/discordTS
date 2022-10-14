import { Channel, ColorResolvable} from "discord.js";

export interface Config {
    token: String,
    color: ColorResolvable,



    //TODO mutli guild purpose
    channel: {
        logChannel: {
            id?: string,
            channel?: Channel | null
        }
        ErrorChannel: {
            id?: string,
            channel?: Channel | null
        }
    }
}