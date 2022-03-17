const { Message, Client } = require("discord.js");
const { emojis } = require("../../../config")
const { slowmodeEmoji, pendingReview } = emojis
const respondWithError = require("../../../utils/error/response");
const { sendLog, sendErrorLog } = require("../../../utils/log");

module.exports = {
  name: "slowmode",
  desc: "Sets slowmode in the channel the command was run in.",
  aliases: ["sl", "s"],
  permissionLevel: 2,

  /**
   *
   * @param {Client} client
   * @param {Message} message
   */

  async execute(client, message, args) {
    var stime = args[0]; //in secs
    const currentChannel = `<#${message.channel.id}>`;
    const oldSlowmode = message.channel.rateLimitPerUser

    if (!stime || args[0] == "check") {
      if (message.channel.rateLimitPerUser == 0) {
        message.channel.send({
          content: `${slowmodeEmoji} Slowmode in ${currentChannel} is currently disabled.`
        });

        return;
      } else {
        message.channel.send({
          content:
            `${slowmodeEmoji} Slowmode in ${currentChannel} is currently ` +
            "`" +
            message.channel.rateLimitPerUser +
            "` seconds."
        });

        return;
      }
    }

    if (args[0].includes("+")) {
      stime = Number(message.channel.rateLimitPerUser) + Number(stime);

      if (isNaN(stime)) {
        return respondWithError({
          message: message,
          errorMessage: `The time provided is not a number.`
        });
      }
    }

    if (args[0].includes("-")) {
      stime = Number(message.channel.rateLimitPerUser) + Number(stime);

      if (isNaN(stime)) {
        return respondWithError({
          message: message,
          errorMessage: `The time provided is not a number.`
        });
      }
    }

    try {
      
      await message.channel.setRateLimitPerUser(stime);

      await sendLog(
        {
          title: `${pendingReview} Slowmode Changed`,
          action: `Channel Slowmode Edited`,
          change: `${oldSlowmode}s ---> ${message.channel.rateLimitPerUser}s`,
          color: "YELLOW"
        },
        client,
        message
      );
      
    } catch (error) {
      await respondWithError({
        message: message,
        errorMessage: `Could not set slowmode to **${stime}** seconds.`
      });
      await sendErrorLog(
        { command: "Slowmode", error: error },
        message,
        client
      );

      return;
    }

    if (stime == 0) {
      message.channel.send({
        content: `${slowmodeEmoji} Slowmode in ${currentChannel} has been disabled. Have fun!`
      });

      await sendLog(
        {
          title: `${pendingReview} Slowmode Disabled`,
          action: `Channel Slowmode Cleared`,
          change: `${oldSlowmode}s ---> 0s`,
          color: "YELLOW"
        },
        client,
        message
      );
    } else {

      message.channel.send({
        content:
          `${slowmodeEmoji} Slowmode in ${currentChannel} has been set to ` +
          "`" +
          stime +
          "` seconds."
      });
    }
  }
};
