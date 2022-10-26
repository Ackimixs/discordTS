import { Bot } from "src/Structures/Bot";
import {ChatInputCommandInteraction, EmbedBuilder, GuildResolvable} from "discord.js";
import {getRandomTrack, randomTrack} from "../../Structures/db/Artist";
import ms from "ms";
import {BlindtestSession, SessionUser} from "src/Structures/db/Schema/Guild";
import {createEmbed} from "../../utils/embed";
import {updateGuild} from "../../Structures/db/Guild";

module.exports = async (client: Bot, interaction: ChatInputCommandInteraction) => {

    const { options, guild, user, channel, member } = interaction

    await interaction?.deferReply({ephemeral: true})

    await interaction.followUp('a blindest is loading ...')

    if (!options || !guild || !user) return

    const numberOfTrack = options.getNumber("number") as number

    if (numberOfTrack > 20 || numberOfTrack < 1) {
        return await interaction.editReply("The value must be between 1 and 20")
    }

    const guildBlindtest = await client.config.Guild.get(guild.id)

    const blindtestSession = guildBlindtest?.blindtestSession;

    if (!blindtestSession) return interaction.editReply("I'm sorry but an error occured, please contact admin")

    if (!blindtestSession.terminate) return await client.editReply(interaction,"blindtest", "❌", "A blindtest session is already started")

    blindtestSession.round = 0;

    blindtestSession.result = new Map<string, randomTrack>()
    blindtestSession.member = new Map<string, SessionUser>()

    //Must have 2 track else the is a bug
    for (let i = 0; i < numberOfTrack; i++) {
        const track = await getRandomTrack()

        if (!track) break;

        const tracks = await client.player.search(track.trackUrl as string, {
            requestedBy: user,
        })

        if (!tracks || !tracks.tracks[0]) return client.editReply(interaction, "blindtest", "❌", "an error ocurend when i search the song on the web")

        track.Track = tracks.tracks[0];

        await blindtestSession.result.set(i.toString(), track);
    }

    await updateGuild(guild.id, guildBlindtest)

    //Starting blindtest
    let queue = client.player.getQueue(guild as GuildResolvable)

    if (!queue) {
        queue = await client.player.createQueue(guild as GuildResolvable, {
            metadata: {
                channel: channel,
            },
            ytdlOptions: {
                filter: 'audioonly',
                highWaterMark: 1 << 30,
                dlChunkSize: 0,
            },
            leaveOnEmpty: false,
            leaveOnEnd: false,
            leaveOnStop: false,
        });
    }

    try {
        if (!queue.connection) {
            // @ts-ignore
            await queue.connect(member?.voice.channel)
        }
    } catch (err) {
        client.player.deleteQueue(guild as GuildResolvable)
        return await interaction.editReply("Could not join your voice channel!");
    }

    blindtestSession.terminate = false;

    await interaction.followUp("The blindtest is starting !!")

    await queue.play(blindtestSession.result.get(blindtestSession.round.toString())?.Track)

    const interval = await setInterval(async () => {
        blindtestSession.round++;
        if (!blindtestSession.result.get(blindtestSession.round.toString())) {
            await verifyAllUser(blindtestSession, client)
            blindtestSession.terminate = true
            clearInterval(interval)
            await queue?.destroy()
            await updateGuild(guild.id, guildBlindtest);
            const embed = await BlindtestLeaderboardEmbed(blindtestSession, client);
            await interaction.followUp({embeds: [embed]})
        }

        await queue?.play(blindtestSession.result.get(blindtestSession.round.toString())?.Track)

        if (!queue?.destroyed) {
            await queue?.skip()
        }

    }, ms("30s"))
}

const verifyAllUser = async (session: BlindtestSession, client: Bot) => {

    if (!session || !session.member) return;

    for (let value of session.member.values()) {

        if (!value?.resultRound) return;

        const embed = await createEmbed(client);

        embed.setTitle("Blindtest session")

        for (const [resultKey, resultValue] of value.resultRound) {

            const right = session.result.get(resultKey)
            if (!right) return;

            embed.addFields({
                name: `Right anwser : **${right.trackName}** - **${right.artistName}** [link](${right.trackUrl})`,
                value: `Your input : **${resultValue.trackName}** - **${resultValue.artistName}**`
            })

            //Spotify search
            const Spotify = client.spotifyClient;

            const { tracks } = await Spotify.search(resultValue.artistName + ' ' + resultValue.trackName, {types: ["track"]})

            if (!tracks || !tracks[0]) return;

            const musicUrl = tracks[0].externalURL.spotify

            if (right.trackUrl === musicUrl) {
                value.point++
            }
        }

        const user = await client?.users?.fetch(value.id);

        if (!user) return;

        embed.setDescription(`you have ${value.point}/${session.round} to the blndtest`);

        await user.send({embeds: [embed]});
    }

}


export const BlindtestLeaderboardEmbed = async (session: BlindtestSession, client: Bot): Promise<EmbedBuilder> => {

    const embed = await createEmbed(client);

    embed.setTitle("Blindtest session")

    let leaderboardUser: string = '';

    const sortedUser = new Map([...session.member.entries()].sort((a, b) => b[1].point - a[1].point).slice(0, 3));

    let i = 1;
    for (let value of sortedUser.values()) {
        leaderboardUser += `${i} - **${value.tag}**\n`
        i++;
    }

    embed.addFields({
        name: "User leaderboard",
        value: leaderboardUser ?? ""
    })

    let response: string = '';

    for (let [key, value] of session.result) {
        response += `${parseInt(key, 10)+1} - **${value.trackName}** by **${value.artistName}** [link](${value.trackUrl})\n`
    }

    embed.addFields({
        name: "Track info :",
        value: response ?? ""
    })

    return embed
}