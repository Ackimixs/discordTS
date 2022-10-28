require('dotenv').config();
module.exports = {
    token : process.env.BOT_TOKEN,
    spotifyClientId: process.env.SPOTIFY_CLIENTID,
    spotifyClientSecret: process.env.SPOTIFY_SECRET,
    mongoUri: process.env.DATABASE_URI
};