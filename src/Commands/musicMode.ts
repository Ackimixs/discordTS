import {ApplicationCommand, ApplicationCommandOptionType, ChatInputCommandInteraction} from "discord.js";
import { Bot } from "../Structures/Bot";
import { updateGuild } from "../Structures/db/Guild";
import { GuildBot } from "../Structures/db/Schema/Guild";

module.exports = {
    name: "music_mode",
    description: "set the full music system or not",
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

        const minMusicCommand = ["play", "stop", "pause", "resume", "skip", "nowplaying", "queue", "set"]

        const { options, guildId } = interaction;

        const fullSystem = options.getString('mode') as string;

        const guild = client.config.Guild.get(guildId as string) as GuildBot

        guild.musicSystem = fullSystem === "full"

        await updateGuild(guildId as string, guild);

        const guildData = await client.guilds.fetch(guildId as string)

        const commandList = await guildData.commands.fetch()

        let command: ApplicationCommand | undefined

        for (let value of commandList.values()) {
            if (value.name === "music") {
                command = value
            }
        }

        if (!command) return client.Reply(interaction, "Music Mode", "❌", "The music command is not found", true);

        const newMusic = require(`./music_${fullSystem}`);

        await guildData.commands.edit(command, newMusic);

        return client.Reply(interaction, "music", "✅", `the the music system to : **${fullSystem}** \n (Ps: you have to wait maximum 1min)`);
    }
}
//TODO make 2 different file music_full / music_min and required min in the ready event and in the musicMode require min or full