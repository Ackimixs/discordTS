"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = async (client, queue) => {
    if (!queue || !queue.playing) {
        return await client.Reply(`Command ${client.interaction?.options.getSubcommand()}`, "❌", "I don't find music on your channel sorry", true);
    }
    const song = queue.current;
    await client.Reply(`Info : ${song.title}`, "✅", `Author **${song.author}** | Duration : ${song.duration}`);
};
