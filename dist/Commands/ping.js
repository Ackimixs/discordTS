"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    name: "ping",
    description: "Display the ping",
    category: "Information",
    async execute(client) {
        await client?.Reply("Command", "✅", "Pong", true);
    }
};
