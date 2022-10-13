"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const ms_1 = tslib_1.__importDefault(require("ms"));
module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        await client.logger("Event", "Ready", `Discord Bot log as ${client?.user?.tag || "no name"}`);
        const activityName = ["made with ♡", "trying to be correct", "UwU"];
        await client.user?.setPresence({ activities: [{ name: "starting..." }], status: "dnd" });
        let status;
        let activity;
        setInterval(async () => {
            if (new Date().getHours() < 23 && new Date().getHours() > 6) {
                status = "online";
                activity = activityName[Math.floor(Math.random() * 3)] + "  |    use /help";
            }
            else {
                status = "idle";
                activity = "go bed right now";
            }
            await client.user?.setPresence({ activities: [{ name: activity, type: discord_js_1.ActivityType.Watching }], status });
        }, (0, ms_1.default)("3m"));
    }
};
