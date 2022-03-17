const { emojis, roles } = require('../../../config');
const { memberRole } = roles
const { tickEmoji } = emojis
const { MessageEmbed, Message, Client } = require('discord.js')
const { sendLog } = require("../../../utils/log");
const respondWithError = require('../../../utils/error/response');

module.exports = {
    name: "lock",
    desc: "Locks the specified channel.",
    permissionLevel: 3,
  
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
  
    async execute(client, message, args) {

        const target = message.mentions.channels.first()
        var reason = args.slice(1).join(" ")

        if (!target) {

            return await respondWithError({
                message: message,
                errorMessage: "Please specify the channel you would like to lock."
            })

        }

        if (!reason) {

            return await respondWithError({
                message: message,
                errorMessage: "You must provide a reason for the channel lock."
            })

        }   

        if (target.permissionsFor(memberRole).has("SEND_MESSAGES") == false) {
            return await respondWithError({
                message: message,
                errorMessage: "The channel is already locked."
            })
        } else {
            const initialMessage = await message.channel.send({ content: ":lock: Locking channel..." })

            target.permissionOverwrites.edit(memberRole, { SEND_MESSAGES: false });

            const ChannelLock = new MessageEmbed()
            .setAuthor({
                iconURL: message.author.displayAvatarURL({ dynamic: true }),
                name: message.author.tag
            })
            .setTitle("Channel Lock")
            .setDescription("This channel has been locked by a staff member. **__You are not muted!__** All important updates will be sent by staff below this message.")
            .setColor('ORANGE')
            .addField("Reason", reason)
            .setTimestamp()
            
            await target.send({ embeds: [ChannelLock] })

            await sendLog(
                { title: ":lock: Channel Locked", action: "Channel Permission Edited (Reason: " + reason + ")", change: "Channel Unlocked ---> Channel Locked", color: "ORANGE" },
                client,
                message
              )

            await initialMessage.edit({ content: tickEmoji + " Channel lock complete." })
            
            await message.delete()
        }

    }
}