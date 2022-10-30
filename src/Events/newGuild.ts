import {Events, Guild} from "discord.js"
import { Bot } from "src/Structures/Bot";
import {createGuild} from "../Structures/db/Guild";

module.exports = {
    name: Events.GuildCreate,
    once: false,

    async execute(guild: Guild, client: Bot) {

        const data = await createGuild(guild.id)

        client.config.Guild.set(data.guildId, data);

        await client.logger("Event", "Guild add", `Guild name : ${guild.name} | guild id : ${guild.id}`)
    }
}