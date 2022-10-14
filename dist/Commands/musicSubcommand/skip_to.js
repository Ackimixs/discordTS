"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = async (client, queue) => {
    const { options } = client.interaction;
    if (!queue || !queue.playing) {
        return await client.Reply(`Command ${client.interaction?.options.getSubcommand()}`, "❌", "I don't find music on your channel sorry", true);
    }
    const pos = options.getInteger("position");
    const skipToTrack = queue.tracks[pos + 1];
    queue.skipTo(pos + 1);
    return await client.Reply("Command skip to", "✅", `Music skip to **${skipToTrack.title}**`);
};
