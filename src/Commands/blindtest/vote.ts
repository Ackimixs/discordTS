import {Bot} from "../../Structures/Bot";
import {ChatInputCommandInteraction} from "discord.js";
import {createSessionUser} from "../../Structures/db/Session";

module.exports = async (client: Bot, interaction: ChatInputCommandInteraction) => {

    const { options, user, guild } = interaction

    const session = client.config.Guild.get(guild?.id as string)?.blindtestSession

    if (!session || session.terminate) return client.Reply(interaction, 'vote', "❌", 'no blindtest session started on your server')

    const artistName = options.getString("artist_name_vote") as string
    const trackName = options.getString("track_name_vote") as string

    let userData = session.member ? session.member.get(user.id) : undefined

    if (!userData) {
        userData = createSessionUser(user, guild?.id as string);

        session.member.set(user.id, userData);
    }

    userData?.resultRound.set(session.round.toString(), {trackName, artistName, trackUrl: ''})

    return await client.Reply(interaction, "vote", "✅", `You vote : **${artistName}** as artist name and **${trackName}** as track name`, true);
}