import { EmbedBuilder } from "discord.js";
import { Bot } from "src/Structures/Bot";
import { randomTrack } from "src/Structures/db/Artist";
import {BlindtestSession, SessionUser} from "src/Structures/db/Schema/Guild";
import { createEmbed } from "./embed";

export const BlindtestLeaderboardEmbed = async (session: BlindtestSession, client: Bot): Promise<EmbedBuilder> => {

    const embed = await createEmbed(client);

    embed.setTitle("Blindtest session")

    let leaderboardUser: string = '';

    const sortedUser = new Map([...session.member.entries()].sort((a, b) => b[1].point - a[1].point).slice(0, 3));

    if (!sortedUser.size) {
        embed.setDescription(`Nobody play in the last session :/`);
        return embed;
    }

    let i = 1;
    for (let value of sortedUser.values()) {
        leaderboardUser += `${i} - **${value.tag}**\n`
        i++;
    }

    embed.addFields({
        name: "User leaderboard",
        value: leaderboardUser ?? ""
    })

    let response: string[] = [];
    let size = 0;

    for (let [key, value] of session.result) {

        const s = `${parseInt(key, 10)+1} - **${value.trackName}** by **${value.artistName}** [link](${value.trackUrl})\n`

        if (size + s.length > 1000) {
            embed.addFields({
                name: "Track info :",
                value: response.join(" ")
            })
            size = 0;
            response = []
        }

        response.push(s)
        size += s.length
    }
    //Error max string > 1024
    if (response) {
        embed.addFields({
            name: "Track info :",
            value: response.join(" ") ?? ""
        })
    }
    return embed
}