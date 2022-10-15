import * as fs from "fs";
import mongoose from "mongoose";
import { Config } from "./interface/config";
import {GuildBot} from "./Structures/db/Schema/Guild";

const { GatewayIntentBits } = require("discord-api-types/v10");
const { Partials, Collection } = require("discord.js");
const { Channel, GuildMember, Message, Reaction, ThreadMember, User, GuildScheduledEvent } = Partials;
const { Bot } = require('./Structures/Bot');
const validEnv = require('./utils/validEnv');

(async () => {

    if (!validEnv()) {
        throw new Error('Env is not valid')
    }

    const config: Config = {
        token: process.env.BOT_TOKEN as string,
        spotifyCLientId: process.env.SPOTIFY_CLIENTID as string,
        spotifySecret: process.env.SPOTIFY_SECRET as string,
        mongoUri: process.env.DATABASE_URI as string,
        color: "Random",
        Guild: new Map<string, GuildBot>()
    }

    const client = new Bot({
        intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.Guilds, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildScheduledEvents, GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.MessageContent],
        partials: [Channel, GuildMember, Message, Reaction, ThreadMember, User, GuildScheduledEvent],
        allowedMentions: { parse: ["everyone", "users", "roles"] },
    }, config)



    client.commands = new Collection();

    //Handler
    const files = fs.readdirSync("./dist/Handler")

    files.forEach(file => {
        require(`./Handler/${file}`)(client)
    })

    await mongoose.connect(client.config.mongoUri, {
        // @ts-ignore
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    module.exports = client

    await client.login(client.config.token)
})()