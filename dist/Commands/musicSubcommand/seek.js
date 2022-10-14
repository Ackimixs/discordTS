"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = async (client, queue) => {
    const { options } = client.interaction;
    if (!queue || !queue.playing) {
        return await client.Reply(`Command ${client.interaction?.options.getSubcommand()}`, "❌", "I don't find music on your channel sorry", true);
    }
    const time = options.getInteger('time');
    await queue.seek(time * 1000);
    await client.Reply('Command seek', "✅", `Seeked to ${time} secondes`);
};
