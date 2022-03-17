const { emojis, roles } = require('../../../config');
const { memberRole } = roles
const { tickEmoji } = emojis
const { MessageEmbed, Message, Client } = require('discord.js')
const { sendLog } = require("../../../utils/log");
const respondWithError = require('../../../utils/error/response');

module.exports = {
    name: "unlock",
    desc: "Unlocks the specified channel.",
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
                errorMessage: "Please specify the channel you would like to unlock."
            })

        }

        if (!reason) {

            return await respondWithError({
                message: message,
                errorMessage: "You must provide a reason for the channel unlock."
            })

        }   

        if (target.permissionsFor(memberRole).has("SEND_MESSAGES") == true) {
            return await respondWithError({
                message: message,
                errorMessage: "The channel is already unlocked."
            })
        } else {
            const initialMessage = await message.channel.send({ content: ":lock: Unlocking channel..." })

            target.permissionOverwrites.edit(memberRole, { SEND_MESSAGES: null });

            const ChannelLock = new MessageEmbed()
            .setAuthor({
                iconURL: message.author.displayAvatarURL({ dynamic: true }),
                name: message.author.tag
            })
            .setTitle("Channel Unlock")
            .setDescription("This channel has been unlocked by a staff member. You can continue chatting normally.")
            .setColor('ORANGE')
            .addField("Reason", reason)
            .setTimestamp()
            
            await target.send({ embeds: [ChannelLock] })

            await sendLog(
                { title: ":lock: Channel Unlocked", action: "Channel Permission Edited (Reason: " + reason + ")", change: "Channel Locked ---> Channel Unlocked", color: "GREEN" },
                client,
                message
              )

            await initialMessage.edit({ content: tickEmoji + " Channel unlock complete." })
            
            await message.delete()
        }

    }
}