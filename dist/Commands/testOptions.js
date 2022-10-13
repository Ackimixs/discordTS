"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    name: 'test',
    description: 'test',
    category: "Information",
    options: [
        {
            type: 2,
            name: "test",
            description: "test",
            require: true
        }
    ],
    async execute(client) {
        client.interaction?.reply("true");
    }
};
