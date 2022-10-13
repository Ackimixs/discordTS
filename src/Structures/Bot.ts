import {Client, ClientOptions, Collection, ColorResolvable, CommandInteraction, EmbedBuilder} from "discord.js";
import { Command } from "src/interface/command";
import { Config } from "src/interface/config";
const consola = require('consola')

export class Bot extends Client {
    commands: Collection<string, Command>
    config: Config
    interaction: CommandInteraction | null

    constructor(options: ClientOptions, config: Config) {
        super(options);
        this.commands = new Collection()
        this.config = config
        this.interaction = null
    }

    async Reply(title: string, emoji: string ,content: string, ephemeral: boolean = false): Promise<void> {
        const embed = new EmbedBuilder()
        .setColor(this.config.color).setDescription(emoji + ' | ' + content).setTitle(title).setTimestamp().setFooter({ text: `Made with ♡ by an other guys`, iconURL: this.user?.avatarURL() as string })

        await this.interaction?.reply({ embeds: [embed], ephemeral: ephemeral});
    }

    async editReply(interaction: CommandInteraction, title: string, emoji: string ,content: string): Promise<void> {
        const embed = new EmbedBuilder()
        .setColor(this.config.color).setDescription(emoji + ' | ' + content).setTitle(title).setTimestamp().setFooter({ text: `Made with ♡ by an other guys`, iconURL: this.user?.avatarURL() as string })

        await this.interaction?.editReply({ embeds: [embed]});
    }

    async logger(type: string, name: string, description: string) {
        consola.success(`[${type}][${name}] ${description}`);
    }
}
