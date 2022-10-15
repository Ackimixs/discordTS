"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const ms_1 = tslib_1.__importDefault(require("ms"));
const Guild_1 = require("../Structures/db/Schema/Guild");
const { createGuild } = require('../Structures/db/createGuild');
module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        await client.logger("Event", "Ready", `Discord Bot log as ${client?.user?.tag || "no name"}`);
        const activityName = ["made with ♡", "trying to be correct", "inspired by Androz2091 discord bot", "made with ♡", "trying to be correct", "made with ♡", "trying to be correct", "made with ♡", "trying to be correct"];
        await client.user?.setPresence({ activities: [{ name: "starting..." }], status: "dnd" });
        let status;
        let activity;
        setInterval(async () => {
            if (new Date().getHours() < 23 && new Date().getHours() > 6) {
                status = "online";
                activity = activityName[Math.floor(Math.random() * (activityName.length - 1))] + "  |  use /help";
            }
            else {
                status = "idle";
                activity = "go bed right now";
            }
            await client.user?.setPresence({ activities: [{ name: activity, type: discord_js_1.ActivityType.Watching }], status });
        }, (0, ms_1.default)("3m"));
        const guildDB = await Guild_1.GuildDB.find();
        guildDB.forEach(guild => {
            client.config.Guild?.set(guild.guildId, guild);
        });
        const guildsBot = await client.guilds.cache;
        guildsBot.forEach(guild => {
            if (!client.config.Guild?.has(guild.id)) {
                createGuild(guild.id, client);
            }
        });
    }
};
