"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
const discord_js_1 = require("discord.js");
const discord_player_1 = require("discord-player");
const getGuild_1 = require("./db/getGuild");
const embed_1 = require("../utils/embed");
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
        const e = await (0, embed_1.createEmbed)(this);
        e.setDescription(emoji + ' | ' + content).setTitle(title);
        try {
            await this.interaction?.reply({ embeds: [e], ephemeral: ephemeral });
        }
        catch (e) {
            console.log(e);
        }
    }
    async editReply(title, emoji, content) {
        const e = await (0, embed_1.createEmbed)(this);
        e.setDescription(emoji + ' | ' + content).setTitle(title);
        try {
            await this.interaction?.reply({ embeds: [e] });
        }
        catch (e) {
            console.log(e);
        }
    }
    async replyEmbed(embed) {
        try {
            await this.interaction?.reply({ embeds: [embed] });
        }
        catch (e) {
            console.log(e);
        }
    }
    async logger(type, name, description, guild = null) {
        consola.success(`[${type}][${name}] ${description}`);
        if (!guild)
            return;
        const guildDB = await (0, getGuild_1.getGuild)(guild.id);
        const channelId = guildDB.logChannel?.id;
        if (!channelId)
            return;
        const channel = await this.channels.fetch(channelId);
        if (!channel || !channel?.isTextBased())
            return;
        const e = await (0, embed_1.createEmbed)(this);
        e.setTitle(`Log | type : ${type}`).setDescription(`${name} | ${description}`);
        await channel.send({ embeds: [e] });
    }
}
exports.Bot = Bot;
