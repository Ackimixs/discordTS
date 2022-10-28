import * as fs from "fs";
import { Config } from "./interface/config";
import {GuildBot} from "./Structures/db/Schema/Guild";
import mongoose from "mongoose";
const { token, spotifyClientId, spotifyClientSecret, mongoUri} = require("./config")
const { GatewayIntentBits } = require("discord-api-types/v10");
const { Partials, Collection } = require("discord.js");
const { Bot } = require('./Structures/Bot');
const validEnv = require('./utils/validEnv');

(async () => {

    validEnv()

    const config: Config = {
        env: {
            token: token as string,
            spotifyClientId: spotifyClientId as string,
            spotifySecret: spotifyClientSecret as string,
            mongoUri: mongoUri as string,
        },
        color: "Random",
        dev: process.env.MODE || "dist",
        Guild: new Map<string, GuildBot>()
    }

    const client = new Bot({
        intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.Guilds, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildScheduledEvents, GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.MessageContent],
        partials: [Partials.Channel, Partials.GuildMember, Partials.Message, Partials.Reaction, Partials.ThreadMember, Partials.User, Partials.GuildScheduledEvent],
        allowedMentions: { parse: ["everyone", "users", "roles"] },
        presence: {activities: [{ name: "starting..." }], status: "dnd"}
    }, config)

    client.commands = new Collection();

    //Handler
    const files = fs.readdirSync(`./${client.config.dev}/Handler`)

    files.forEach(file => {
        require(`./Handler/${file}`)(client)
    })

    await mongoose.connect(client.config.env.mongoUri)

    module.exports = client

    await client.login(client.config.env.token)
})()
//TODO upgrade the random track like type of song
//TODO spped (user - music createdAt)