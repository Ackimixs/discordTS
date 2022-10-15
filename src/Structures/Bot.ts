import {
    Channel,
    Client,
    ClientOptions,
    Collection,
    CommandInteraction,
    EmbedBuilder,
    Guild,
    TextBasedChannel
} from "discord.js";
import { Command } from "src/interface/command";
import { Config } from "src/interface/config";
import {Player} from "discord-player";
import {getGuild} from "./db/getGuild";
import { GuildBot } from "./db/Schema/Guild";
import { createEmbed } from "../utils/embed";
const consola = require('consola')

export class Bot extends Client {
    commands: Collection<string, Command>
    config: Config
    interaction: CommandInteraction | null

    player: Player
    constructor(options: ClientOptions, config: Config) {
        super(options);
        this.commands = new Collection()
        this.config = config
        this.interaction = null
        this.player = new Player(this)
    }

    async Reply(title: string, emoji: string ,content: string, ephemeral: boolean = false): Promise<void> {
        const e = await createEmbed(this)
        e.setDescription(emoji + ' | ' + content).setTitle(title)

        await this.interaction?.reply({ embeds: [e], ephemeral: ephemeral});
    }

    async editReply(title: string, emoji: string ,content: string): Promise<void> {
        const e = await createEmbed(this)
        e.setDescription(emoji + ' | ' + content).setTitle(title)

        await this.interaction?.editReply({ embeds: [e]});
    }

    async logger(type: string, name: string, description: string, guild: Guild | null = null): Promise<void> {
        consola.success(`[${type}][${name}] ${description}`);

        if (!guild) return

        const guildDB: GuildBot = await getGuild(guild.id)

        const channelId = guildDB.logChannel?.id

        if (!channelId) return;

        const channel = await this.channels.fetch(channelId);

        if (!channel || !channel?.isTextBased()) return;

        const e = await createEmbed(this)
        e.setTitle(`Log | type : ${type}`).setDescription(`${name} | ${description}`)

        await channel.send({embeds: [e]})
    }
}
