"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Session_1 = require("../../Structures/db/Session");
module.exports = async (client, interaction) => {
    const { options, user, guild } = interaction;
    const session = client.config.Guild.get(guild?.id)?.blindtestSession;
    if (!session || session.terminate)
        return client.Reply(interaction, 'vote', "❌", 'no blindtest session started on your server');
    const artistName = options.getString("artist_name_vote");
    const trackName = options.getString("track_name_vote");
    let userData = session.member ? session.member.get(user.id) : undefined;
    if (!userData) {
        userData = (0, Session_1.createSessionUser)(user, guild?.id);
        session.member.set(user.id, userData);
    }
    userData?.resultRound.set(session.round.toString(), { trackName, artistName, trackUrl: '' });
    return await client.Reply(interaction, "vote", "✅", `You vote : **${artistName}** as artist name and **${trackName}** as track name`, true);
};
