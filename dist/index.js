"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
const { GatewayIntentBits } = require("discord-api-types/v10");
const { Partials, Collection } = require("discord.js");
const { Channel, GuildMember, Message, Reaction, ThreadMember, User, GuildScheduledEvent } = Partials;
const { Bot } = require('./Structures/Bot');
(async () => {
    const config = {
        token: process.env.BOT_TOKEN,
        color: "Random",
        channel: {
            logChannel: {
                id: "1020658285474500648",
                channel: null
            },
            ErrorChannel: {
                id: '1020658285474500648',
                channel: null
            }
        }
    };
    const client = new Bot({
        intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.Guilds, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildScheduledEvents, GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.MessageContent],
        partials: [Channel, GuildMember, Message, Reaction, ThreadMember, User, GuildScheduledEvent],
        allowedMentions: { parse: ["everyone", "users", "roles"] },
    }, config);
    client.commands = new Collection();
    const files = fs.readdirSync("./dist/Handler");
    files.forEach(file => {
        require(`./Handler/${file}`)(client);
    });
    await client.login(process.env.BOT_TOKEN);
})();
