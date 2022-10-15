import { EmbedBuilder} from "discord.js";
import { Bot } from "src/Structures/Bot";

export const createEmbed = async (client: Bot): Promise<EmbedBuilder> => {
    return new EmbedBuilder().setColor(client.config.color).setTimestamp().setFooter({
        text: `Made with ♡ by an other guys`,
        iconURL: client.user?.avatarURL() as string
    })
}