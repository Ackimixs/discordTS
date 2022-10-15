import {CommandInteraction, Guild, InteractionType} from "discord.js"
import { Bot } from "src/Structures/Bot";
import {Command} from "../interface/command";
import {createGuild} from "../Structures/db/createGuild";


module.exports = {
    name: 'guildCreate',
    once: false,

    async execute(guild: Guild, client: Bot) {

        await createGuild(guild.id, client)

        await client.logger("Event", "Guild add", `Guild name : ${guild.name} | guild id : ${guild.id}`)
    }
}