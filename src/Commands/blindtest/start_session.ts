import { Bot } from "src/Structures/Bot";
import {ChatInputCommandInteraction, GuildResolvable} from "discord.js";
import {getRandomTrack, randomTrack} from "../../Structures/db/Artist";
import ms from "ms";
import { SessionUser } from "src/Structures/db/Schema/SessionUser";
import {createEmbed} from "../../utils/embed";

module.exports = async (client: Bot, interaction: ChatInputCommandInteraction) => {

    const { options, guild, user, channel, member } = interaction

    await interaction?.deferReply()

    //await client.editReply("blindtest", "✅", "All a blindtest is started by : " + user.tag)
    await interaction.editReply('a blindest is started')

    if (!options || !guild || !user) return

    const blindtestSession = client.config.Guild.get(guild.id)?.blindtestSession;

    if (!blindtestSession) return interaction.editReply("I'm sorry but an error occured")

    blindtestSession.round = 0;

    blindtestSession.result = new Map<string, randomTrack>()
    blindtestSession.member = new Map<string, SessionUser>()

    blindtestSession.terminate = false;

    for (let i = 0; i < 2; i++) {
        //Get random n'est pas random
        const track = await getRandomTrack()

        if (!track) break;

        await blindtestSession.result.set(i.toString(), track);
    }


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
            await queue.connect(member.voice.channel)
        }
    } catch (err) {
        client.player.deleteQueue(guild as GuildResolvable)
        return await interaction.editReply("Could not join your voice channel!");
    }


    let tracks = await client.player.search(blindtestSession.result.get(blindtestSession.round.toString())?.trackUrl as string, {
        requestedBy: user,
    })

    await queue.play(tracks.tracks[0])

    const interval = await setInterval(async () => {
        blindtestSession.round++;
        if (!blindtestSession.result.get(blindtestSession.round.toString())) {
            await verifyAllUser(client ,guild.id)
            blindtestSession.terminate = true
            clearInterval(interval)
            await queue?.destroy()
            return interaction.editReply("end blindtest")
        }

        tracks = await client.player.search(blindtestSession.result.get(blindtestSession.round.toString())?.trackUrl as string, {
            requestedBy: user,
        })

        await queue?.play(tracks.tracks[0])

        await queue?.skip()
    }, ms("60s"))
}

const verifyAllUser = async (client: Bot,guildId: string) => {
    const session = client.config.Guild.get(guildId)?.blindtestSession;

    const embed = await createEmbed(client)

    if (!session) return;

    let rightAnswer: number;

    session.member.forEach(member => {
        member.resultRound.forEach(async (value, key) => {
            rightAnswer = 0;
            const right = session.result.get(key)
            if (!right) return;

            //Spotify search
            const Spotify = client.spotifyClient;

            // @ts-ignore
            const { tracks } = await Spotify.search(value.artistName + ' ' + value.trackName, {types: ["track"]})

            if (!tracks) return;

            const musicUrl = tracks[0].externalURL.spotify

            if (right.trackUrl === musicUrl) {
                rightAnswer++;
            }

            const user = await client?.users?.fetch(member._id);

            if (!user) return;

            embed.setDescription(`you have ${rightAnswer}/${session.round} to the blndtest`);

            await user.send({embeds: [embed]});
        })
    })
}