import {ActivityType, PresenceStatusData} from "discord.js";
import { Bot } from "src/Structures/Bot";
import ms from 'ms'

module.exports = {
    name: "ready",
    once: true,

    async execute(client: Bot) {
        console.clear()

        await client.logger("Event", "Ready", `Discord Bot log as ${client?.user?.tag || "no name"}`)


        const activityName = ["made with ♡", "trying to be correct", "UwU"]

        await client.user?.setPresence({ activities: [{ name: "starting..." }], status: "dnd"});

        let status: PresenceStatusData;
        let activity: string;

        setInterval(async () => {
            if (new Date().getHours() < 23 && new Date().getHours() > 6) {
                status = "online";
                activity = activityName[Math.floor(Math.random()*3)] + "  |    use /help"
            } else {
                status = "idle";
                activity = "go bed right now"
            }
            await client.user?.setPresence({activities: [{name: activity, type: ActivityType.Watching}], status})
        }, ms("3m"))
    }
}