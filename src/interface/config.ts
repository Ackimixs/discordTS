import { ColorResolvable} from "discord.js";
import { GuildBot } from "src/Structures/db/Schema/Guild";

export interface Config {
    token: string,
    spotifyToken: string,
    mongoUri: string,
    color: ColorResolvable
    Guild: Map<string, GuildBot>
}