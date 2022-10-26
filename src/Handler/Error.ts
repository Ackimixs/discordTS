import { Bot } from "src/Structures/Bot"
import { createEmbed } from "src/utils/embed"

module.exports = async (client: Bot) => {
    const embed = await createEmbed(client)

    process.on("unhandledRejection", (reason, p) => {
        console.log(reason, p)

        const Channel = client.channels.cache.get("1020658285474500648")
        if (!Channel || !Channel.isTextBased()) return

        Channel.send({
            embeds: [
                embed.setDescription("**Unhandled Rejection/Catch :\n\n** ```js" + reason + "```")
            ]
        })
    })

    process.on("uncaughtException", (err, origin) => {
        console.log(err, origin)

        const Channel = client.channels.cache.get("1020658285474500648")
        if (!Channel || !Channel.isTextBased()) return

        Channel.send({
            embeds: [
                embed.setDescription("**Uncaught Exception/Catch :\n\n** ```js" + err + "\n\n" + origin.toString() +  "```")
            ]
        })
    })

    process.on("uncaughtExceptionMonitor", (err, origin) => {
        console.log(err, origin)

        const Channel = client.channels.cache.get("1020658285474500648")
        if (!Channel || !Channel.isTextBased()) return

        Channel.send({
            embeds: [
                embed.setDescription("**Uncaught Exception/Catch (MONITOR):\n\n** ```js" + err + "\n\n" + origin.toString() +  "```")
            ]
        })
    })
}
