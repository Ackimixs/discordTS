import {Queue} from "discord-player";
import { Bot } from "src/Structures/Bot";
import {ChatInputCommandInteraction} from "discord.js";
import {GuildBot} from "../../Structures/db/Schema/Guild";
import {updateGuild} from "../../Structures/db/Guild";

module.exports = async (client: Bot, queue: Queue, interaction: ChatInputCommandInteraction): Promise<void> => {
    const { options, guild } = interaction;

    const fullSystem = options.getBoolean('mode') as boolean;

    const guildData = client.config.Guild.get(guild?.id as string) as GuildBot

    guildData.musicSystem = fullSystem

    await updateGuild(guild?.id as string, guildData);

    return client.Reply(interaction, "music", "✅", `the the music system to : **${fullSystem ? "full": "min"}**`);
}