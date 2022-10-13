import {ApplicationCommandOption} from "discord.js";
import { Bot } from "src/Structures/Bot";

export interface Command {
    name: string,
    description: string,
    category: string,
    options?: CommandOption[],

    execute (client: Bot): Promise<void>
}

export interface CommandOption {
    type: ApplicationCommandOption,
    name: string,
    description: string,
    require: boolean,
    options: CommandOption[]
}