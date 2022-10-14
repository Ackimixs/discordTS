"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = async (client, queue) => {
    if (!queue || !queue.playing) {
        return await client.Reply(`Command ${client.interaction?.options.getSubcommand()}`, "❌", "I don't find music on your channel sorry", true);
    }
    const enable = client.interaction?.options.getBoolean("enable");
    await queue.setFilters({
        bassboost_high: enable
    });
    return await client.Reply("Command bassboost", "✅", `bassboost filter set to **${enable ? "enable" : "disable"}**`);
};
