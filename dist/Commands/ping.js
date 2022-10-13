"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    name: "ping",
    description: "Display the ping",
    category: "Information",
    async execute(client) {
        return client?.Reply("Ping", "✅", `The current ping is \`${client.ws.ping} ms\``, true);
    }
};
