"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Artist_1 = require("../../Structures/db/Artist");
const ms_1 = tslib_1.__importDefault(require("ms"));
const embed_1 = require("../../utils/embed");
const Guild_1 = require("../../Structures/db/Guild");
const leaderBoardEmebd_1 = require("../../utils/leaderBoardEmebd");
module.exports = async (client, interaction) => {
    const { options, guild, user, channel, member } = interaction;
    await interaction?.deferReply({ ephemeral: true });
    await interaction.followUp('a blindest is loading ...');
    if (!options || !guild || !user || !channel)
        return;
    const numberOfTrack = options.getNumber("number");
    if (numberOfTrack > 20 || numberOfTrack < 1) {
        return await interaction.editReply("The value must be between 1 and 20");
    }
    const guildBlindtest = await client.config.Guild.get(guild.id);
    const blindtestSession = guildBlindtest?.blindtestSession;
    if (!blindtestSession)
        return interaction.editReply("I'm sorry but an error occured, please contact admin");
    if (!blindtestSession.terminate)
        return await client.editReply(interaction, "blindtest", "❌", "A blindtest session is already started");
    blindtestSession.round = 0;
    blindtestSession.result = new Map();
    blindtestSession.member = new Map();
    for (let i = 0; i < numberOfTrack; i++) {
        const track = await (0, Artist_1.getRandomTrack)();
        if (!track)
            break;
        const tracks = await client.player.search(track.trackUrl, {
            requestedBy: user,
        });
        if (!tracks || !tracks.tracks[0])
            return client.editReply(interaction, "blindtest", "❌", "an error ocurend when i search the song on the web");
        track.Track = tracks.tracks[0];
        await blindtestSession.result.set(i.toString(), track);
    }
    await (0, Guild_1.updateGuild)(guild.id, guildBlindtest);
    let queue = client.player.getQueue(guild);
    if (!queue) {
        queue = await client.player.createQueue(guild, {
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
            await queue.connect(member?.voice.channel);
        }
    }
    catch (err) {
        client.player.deleteQueue(guild);
        return await interaction.editReply("Could not join your voice channel!");
    }
    blindtestSession.terminate = false;
    await interaction.followUp("The blindtest is starting !!");
    await queue.play(blindtestSession.result.get(blindtestSession.round.toString())?.Track);
    const interval = await setInterval(async () => {
        blindtestSession.round++;
        if (!blindtestSession.result.get(blindtestSession.round.toString())) {
            await verifyAllUser(blindtestSession, client);
            blindtestSession.terminate = true;
            clearInterval(interval);
            await queue?.destroy();
            await (0, Guild_1.updateGuild)(guild.id, guildBlindtest);
            const embed = await (0, leaderBoardEmebd_1.BlindtestLeaderboardEmbed)(blindtestSession, client);
            await channel.send({ embeds: [embed] });
        }
        await queue?.play(blindtestSession.result.get(blindtestSession.round.toString())?.Track);
        if (!queue?.destroyed) {
            await queue?.skip();
        }
    }, (0, ms_1.default)("60s"));
};
const verifyAllUser = async (session, client) => {
    if (!session || !session.member)
        return;
    for (let value of session.member.values()) {
        const embed = await (0, embed_1.createEmbed)(client);
        embed.setTitle("Blindtest session");
        for (let [rightKey, rightValue] of session.result) {
            embed.addFields({
                name: `Right anwser : **${rightValue.trackName}** - **${rightValue.artistName}**`,
                value: `Your input : **${value.resultRound.get(rightKey)?.trackName ?? "no input"}** - **${value.resultRound.get(rightKey)?.artistName ?? "no input"}**`
            });
            if (value.resultRound.get(rightKey)) {
                const Spotify = client.spotifyClient;
                const { tracks } = await Spotify.search(value.resultRound.get(rightKey)?.artistName + ' ' + value.resultRound.get(rightKey)?.trackName, { types: ["track"] });
                if (!tracks || !tracks[0])
                    return;
                const musicUrl = tracks[0].externalURL.spotify;
                if (rightValue.trackUrl === musicUrl) {
                    value.point++;
                }
            }
        }
        const user = await client?.users?.fetch(value.id);
        if (!user)
            return;
        embed.setDescription(`you have ${value.point}/${session.round} to the blndtest`);
        await user.send({ embeds: [embed] });
    }
};
