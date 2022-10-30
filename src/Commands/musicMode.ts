import {ApplicationCommandOptionType, ChatInputCommandInteraction} from "discord.js";
import { Bot } from "../Structures/Bot";
import { updateGuild } from "../Structures/db/Guild";
import { GuildBot } from "../Structures/db/Schema/Guild";

module.exports = {
    name: "music_mode",
    //description: "set the full music system or not",
    description: "DO NOT WORK",
    category: "Information",
    options: [
        {
            type: ApplicationCommandOptionType.String,
            name: "mode",
            description: "full or minimum mode",
            required: true,
            choices: [
                {
                    name: "full",
                    value: "full"
                },
                {
                    name: "minimum",
                    value: "min"
                }
            ]
        }
    ],


    async execute(client: Bot, interaction: ChatInputCommandInteraction) {

        const { options, guild } = interaction;

        const fullSystem = options.getString('mode') as string;

        const guildData = client.config.Guild.get(guild?.id as string) as GuildBot

        guildData.musicSystem = fullSystem === "full"

        await updateGuild(guild?.id as string, guildData);

        return client.Reply(interaction, "music", "✅", `the the music system to : **${fullSystem}** \n (Ps: you have to wait maximum 1min)`);

    }
}