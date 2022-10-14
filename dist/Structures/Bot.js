"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
const discord_js_1 = require("discord.js");
const discord_player_1 = require("discord-player");
const consola = require('consola');
class Bot extends discord_js_1.Client {
    commands;
    config;
    interaction;
    player;
    constructor(options, config) {
        super(options);
        this.commands = new discord_js_1.Collection();
        this.config = config;
        this.interaction = null;
        this.player = new discord_player_1.Player(this);
    }
    async Reply(title, emoji, content, ephemeral = false) {
        const embed = new discord_js_1.EmbedBuilder()
            .setColor(this.config.color).setDescription(emoji + ' | ' + content).setTitle(title).setTimestamp().setFooter({ text: `Made with ♡ by an other guys`, iconURL: this.user?.avatarURL() });
        await this.interaction?.reply({ embeds: [embed], ephemeral: ephemeral });
    }
    async editReply(title, emoji, content) {
        const embed = new discord_js_1.EmbedBuilder()
            .setColor(this.config.color).setDescription(emoji + ' | ' + content).setTitle(title).setTimestamp().setFooter({ text: `Made with ♡ by an other guys`, iconURL: this.user?.avatarURL() });
        await this.interaction?.editReply({ embeds: [embed] });
    }
    async logger(type, name, description) {
        consola.success(`[${type}][${name}] ${description}`);
    }
}
exports.Bot = Bot;
