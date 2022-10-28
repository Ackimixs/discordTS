import { Guild} from "discord.js"
import { Bot } from "src/Structures/Bot";
import {deleteGuild} from "../Structures/db/Guild";

module.exports = {
    name: 'guildDelete',
    once: false,

    async execute(guild: Guild, client: Bot) {

        await deleteGuild(guild.id)

        client.config.Guild.delete(guild.id);

        await client.logger("Event", "Guild remove", `Guild name : ${guild.name} | guild id : ${guild.id}`)
    }
}