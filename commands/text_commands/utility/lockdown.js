const { Message, Client, MessageEmbed } = require("discord.js");
const { blacklistedLockdown, roles } = require("../../../config");
const respondWithError = require("../../../utils/error/response");
const { sendErrorLog, sendLog } = require("../../../utils/log");
const { memberRole } = roles;

module.exports = {
  name: "lockdown",
  desc: "Locks all channels in the server.",
  permissionLevel: 3,

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  async execute(client, message, args) {
    var reason = args.slice(0).join(" ");
    
    if (!reason) {
      return await respondWithError({
        message: message,
        errorMessage: "You **must** provide a reason for the server lockdown."
      });
    }

    var numberOfChannels = Number(
      message.guild.channels.cache.filter(
        (ch) =>
          ch.type != "GUILD_CATEGORY" && !blacklistedLockdown.includes(ch.id)
      ).size
    );
    var lockedChannels = 0;

    var startedLockdownMessage = new MessageEmbed()
      .setTitle(":lock: Server Lockdown")
      .setDescription(`A lockdown has been started, locking all channels...`)
      .setColor("ORANGE");

    var messageForEachChannel = new MessageEmbed()
      .setTitle(":lock: Server Lockdown")
      .setDescription(
        "The server has been locked by a staff member. You cannot talk until a staff member unlocks the server. **__You are not muted.__** All important updates will be sent by staff below this message."
      )
      .setColor("YELLOW")
      .addField("Reason", reason);

    var originalChannelMessage = await message.channel.send({
      embeds: [startedLockdownMessage]
    });

    message.guild.channels.cache
      .filter(
        (ch) =>
          ch.type != "GUILD_CATEGORY" && !blacklistedLockdown.includes(ch.id)
      )
      .forEach(async (channel) => {
        lockedChannels += 1;

        startedLockdownMessage.setDescription(
          `A lockdown has been started, locking all channels...\n\n**Currently Locking:** <#${
            channel.id
          }> (${((lockedChannels / numberOfChannels) * 100).toFixed(1)}%)`
        );

        await originalChannelMessage.edit({
          content: " ",
          embeds: [startedLockdownMessage]
        });

        var channelType = channel.type;
        //permissionOverwrites.edit(role, { SEND_MESSAGES: false });
        switch (channelType) {
          case "GUILD_TEXT":
            try {
              await channel.permissionOverwrites.edit(memberRole, {
                SEND_MESSAGES: false
              });
              await channel.send({
                content: " ",
                embeds: [messageForEachChannel]
              });
            } catch (error) {
              await sendErrorLog(
                { command: "Lockdown", error: error },
                message,
                client
              );
            }

            break;
          case "GUILD_VOICE":
            try {
              await channel.permissionOverwrites.edit(memberRole, {
                CONNECT: false
              });
            } catch (error) {
              await sendErrorLog(
                { command: "Lockdown", error: error },
                message,
                client
              );
            }

            break;
        }
      });

      await sendLog(
        { title: ":lock: Server on Lockdown", action: "Modify Server", change: "Channels Unlocked ---> Channels Locked", color: "RED" },
        client,
        message
      )

    await originalChannelMessage.edit({
      content: ":lock: Server lockdown completed.",
      embeds: []
    });
  }
};
