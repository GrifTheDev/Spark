const { Message, Client, MessageEmbed } = require("discord.js");
const { blacklistedLockdown, roles } = require("../../../config");
const respondWithError = require("../../../utils/error/response");
const { sendErrorLog, sendLog } = require("../../../utils/log");
const { memberRole } = roles;

module.exports = {
  name: "unlockdown",
  desc: "Unlocks all channels in the server.",
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
        errorMessage: "You **must** provide a reason for the server unlockdown."
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
      .setTitle(":unlock: Server Unlockdown")
      .setDescription(`An unlockdown has been started, unlocking all channels...`)
      .setColor("ORANGE");

    var messageForEachChannel = new MessageEmbed()
      .setTitle(":unlock: Server Unlockdown")
      .setDescription(
        "The server has been unlocked by a staff member. You can continue chatting normally."
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
          `An unlockdown has been started, unlocking all channels...\n\n**Currently Unlocking:** <#${
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
                SEND_MESSAGES: null
              });
              await channel.send({
                content: " ",
                embeds: [messageForEachChannel]
              });
            } catch (error) {
              await sendErrorLog(
                { command: "Unlockdown", error: error },
                message,
                client
              );
            }

            break;
          case "GUILD_VOICE":
            try {
              await channel.permissionOverwrites.edit(memberRole, {
                CONNECT: null
              });
            } catch (error) {
              await sendErrorLog(
                { command: "Unlockdown", error: error },
                message,
                client
              );
            }

            

            break;
        }
      });

      await sendLog(
        { title: ":lock: Server Unlocked", action: "Modify Server", change: "Channels Locked ---> Channels Unlocked", color: "GREEN" },
        client,
        message
      )

    await originalChannelMessage.edit({
      content: ":unlock: Server unlockdown completed.",
      embeds: []
    });
  }
};
