import { ColorResolvable} from "discord.js";
import { GuildBot } from "src/Structures/db/Schema/Guild";

export interface Config {
    token: string,
    spotifyCLientId: string,
    spotifySecret: string,
    mongoUri: string,
    color: ColorResolvable
    Guild: Map<string, GuildBot>
}