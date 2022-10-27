import {
    Client,
    ClientOptions,
    Collection,
    CommandInteraction,
    EmbedBuilder,
    Guild,
} from "discord.js";
import { Command } from "src/interface/command";
import { Config } from "src/interface/config";
import {Player} from "discord-player";
import {getGuild} from "./db/Guild";
import { GuildBot } from "./db/Schema/Guild";
import { createEmbed } from "../utils/embed";
import { Client as SpotifyClient } from "spotify-api.js";
const consola = require('consola');
const Spotify = require("spotify-api.js");

export class Bot extends Client {
    commands: Collection<string, Command>
    config: Config
    spotifyClient: SpotifyClient
    player: Player

    constructor(options: ClientOptions, config: Config) {
        super(options);
        this.commands = new Collection()
        this.config = config
        this.player = new Player(this)
        this.spotifyClient = new Spotify.Client({ token: { clientID: this.config.env.spotifyCLientId, clientSecret: this.config.env.spotifySecret } });
    }

    async Reply(interaction: CommandInteraction, title: string, emoji: string ,content: string, ephemeral: boolean = false): Promise<void> {
        const e = await createEmbed(this)
        e.setDescription(emoji + ' | ' + content).setTitle(title)

        try {
            await interaction?.reply({ embeds: [e], ephemeral: ephemeral});
        } catch (e) {
            console.log(e);
        }
    }

    async editReply(interaction: CommandInteraction, title: string, emoji: string ,content: string): Promise<void> {
        const e = await createEmbed(this)
        e.setDescription(emoji + ' | ' + content).setTitle(title)

        try {
            await interaction?.editReply({ embeds: [e]});
        } catch (e) {
            console.log(e);
        }
    }

    async replyEmbed(interaction: CommandInteraction, embed: EmbedBuilder): Promise<void> {
        try {
            await interaction?.reply({ embeds: [embed]});
        } catch (e) {
            console.log(e);
        }
    }

    async logger(type: string, name: string, description: string, guild: Guild | null = null): Promise<void> {
        consola.success(`[${type}][${name}] ${description}`);

        if (!guild) return

        const guildDB: GuildBot = await getGuild(guild.id)

        if (!guildDB.logChannel?.enable) return

        const channelId = guildDB.logChannel?.id

        if (!channelId) return;

        const channel = await this.channels.fetch(channelId);

        if (!channel || !channel?.isTextBased()) return;

        const e = await createEmbed(this)
        e.setTitle(`Log | type : ${type}`).setDescription(`${name} | ${description}`)

        await channel.send({embeds: [e]})
    }
}