import {ActivityType, PresenceStatusData} from "discord.js";
import { Bot } from "src/Structures/Bot";
import ms from 'ms'
import { GuildBot, GuildDB } from "../Structures/db/Schema/Guild";
const { createGuild } = require('../Structures/db/createGuild')

module.exports = {
    name: "ready",
    once: true,

    async execute(client: Bot) {

        // @ts-ignore
        await client.logger("Event", "Ready", `Discord Bot log as ${client?.user?.tag || "no name"}`)

        const activityName = ["made with ♡", "trying to be correct", "inspired by Androz2091 discord bot", "made with ♡", "trying to be correct", "made with ♡", "trying to be correct", "made with ♡", "trying to be correct"]

        await client.user?.setPresence({ activities: [{ name: "starting..." }], status: "dnd"});

        let status: PresenceStatusData;
        let activity: string;

        setInterval(async () => {
            if (new Date().getHours() < 23 && new Date().getHours() > 6) {
                status = "online";
                activity = activityName[Math.floor(Math.random()*(activityName.length-1))] + "  |  use /help"
            } else {
                status = "idle";
                activity = "go bed right now"
            }
            await client.user?.setPresence({activities: [{name: activity, type: ActivityType.Watching}], status})
        }, ms("3m"))



        const guildDB: GuildBot[] = await GuildDB.find()

        guildDB.forEach(guild => {
            client.config.Guild?.set(guild.guildId, guild)
        })

        const guildsBot = await client.guilds.cache

        guildsBot.forEach(guild => {
            if (!client.config.Guild?.has(guild.id)) {
                createGuild(guild.id, client);
            }
        })
    }
}