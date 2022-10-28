const { token, spotifyClientId, spotifyClientSecret, mongoUri} = require("../config")
module.exports = (): boolean => {
    if (!token) {
        throw new Error("Invalid discord token")
    }

    if (!spotifyClientId) {
        throw new Error("Invalid spotify client id")
    }

    if (!spotifyClientSecret) {
        throw new Error("Invalid spotify client id")
    }

    if (!mongoUri) {
        throw new Error("Invalid mongo uri")
    }
    return true;
}