### Acki discord bot

Another discord bot made with [discord.js](https://github.com/discordjs/discord.js) v14
Inspired by [androz discord bot](https://github.com/Androz2091/discord-music-bot)
the bot have a multi guild system with mongodb, music system, logs system

blindtest system v1.1.0

## how to use

First downloads the repo \n
complete the .env.example as :

```
BOT_TOKEN="your discord bot token"
SPOTIFY_CLIENTID="your spotify client id"
SPOTIFY_SECRET="your spotify secret"
DATABASE_URL="your mango db uri"
```

rename the file as `.env` \n
First of all run `npm install` \n
after run `npm run build` to build javascript project \n
finally run `npm run start` to start the bot \n

## How to have every .env key
[discord bot token](https://discord.com/developers/applications) \n
[spotify client id](https://developer.spotify.com/dashboard) \n
[spotify secret](https://developer.spotify.com/dashboard) \n

for mongodb you can use your db or use mongodb atlas \n
[mongodb](https://www.mongodb.com/fr-fr) \n

## How that work
the bot is build using [discord.js](https://github.com/discordjs/discord.js) libraries and [discord-player](https://github.com/Androz2091/discord-player) for the music part \n
the bot use a mongo database for logs system and multi-guilds purpose \n


## Warning
I'm just a fucking junior dev, so if you have any issue please tell me \n
(Ps: it's only the first version and the bot is not finish) \n
i've some problem with all play command (spotify, insert and play) \n


## In the future
* Better music system and fix some issue with it
* a better bot in general