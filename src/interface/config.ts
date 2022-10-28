import { ColorResolvable} from "discord.js";
import { GuildBot } from "src/Structures/db/Schema/Guild";

export interface Config {
    env: {
        token: string,
        spotifyClientId: string,
        spotifySecret: string,
        mongoUri: string,
    }
    color: ColorResolvable,
    dev: string,
    Guild: Map<string, GuildBot>
}