### Acki discord bot

Another discord bot made with [discord.js](https://github.com/discordjs/discord.js) v14 <br>
Inspired by [androz discord bot](https://github.com/Androz2091/discord-music-bot) <br>
the bot have a multi guild system with mongodb, music system, logs system <br>

blindtest system v1.1.0 <br>

## how to use

First downloads the repo <br>
complete the .env.example as :

```
BOT_TOKEN="your discord bot token"
SPOTIFY_CLIENTID="your spotify client id"
SPOTIFY_SECRET="your spotify secret"
DATABASE_URL="your mango db uri"
```

rename the file as `.env` <br>
First of all run `npm install` <br>
after run `npm run build` to build javascript project <br>
finally run `npm run start` to start the bot <br>

## How to have every .env key
[discord bot token](https://discord.com/developers/applications) <br>
[spotify client id](https://developer.spotify.com/dashboard) <br>
[spotify secret](https://developer.spotify.com/dashboard) <br>

for mongodb you can use your db or use mongodb atlas <br>
[mongodb](https://www.mongodb.com/fr-fr) <br>

## How that work
the bot is build using [discord.js](https://github.com/discordjs/discord.js) libraries and [discord-player](https://github.com/Androz2091/discord-player) for the music part <br>
the bot use a mongo database for logs system and multi-guilds purpose <br>


## Warning
I'm just a fucking junior dev, so if you have any issue please tell me <br>
(Ps: it's only the first version and the bot is not finish) <br>
i've some problem with all play command (spotify, insert and play) <br>


## In the future
* Better music system and fix some issue with it
* a better bot in general