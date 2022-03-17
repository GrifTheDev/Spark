const {
  Message,
  Client,
} = require("discord.js");
const { emojis, colors } = require("../../../config");
const { tickEmoji, loading, pendingReview } = emojis;
const respondWithError = require("../../../utils/error/response");
const { sendLog, sendErrorLog } = require("../../../utils/log");

module.exports = {
  name: "nick",
  desc: "Changes or resets the speicfied member's nickname.",
  aliases: ["tag"],
  permissionLevel: 2,

  /**
   *
   * @param {Client} client
   * @param {Message} message
   */

  async execute(client, message, args) {
    var target =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    
    var newNick = args.slice(1).join(" ");

    if (!target) {
      return await respondWithError({
        message: message,
        errorMessage:
          "Please specify a user who's nickname you would like to moderate.",
      });
    }

    var oldNick = target.nickname || target.user.username

    var rply = await message.reply({
      content: `${loading} Changing nickname...`,
    });

    if (!newNick) {
      try {
        await target.setNickname(target.user.username);
      } catch (error) {
        await sendErrorLog({ command: "Nick", error: error }, message, client);

        await rply.delete();

        return await respondWithError({
          message: message,
          errorMessage:
            "Could not change this member's nickname. Check logs for more details.",
        });
      }

      await sendLog(
        { title: `${pendingReview} Nickname Reset`, action: `Member Nickname Updated (<@${target.user.id}>)`, change: `${oldNick} ---> ${target.user.username}`, color: "YELLOW" },
        client,
        message
      )

      await rply.edit({
        content: `${tickEmoji} Successfully reset **${target.user.tag}'s** nickname.`,
      });
    } else {
      try {
        await target.setNickname(newNick);
      } catch (error) {
        await sendErrorLog({ command: "Nick", error: error }, message, client);

        await rply.delete();

        return await respondWithError({
          message: message,
          errorMessage:
            "Could not change this member's nickname. Check logs for more details.",
        });
      }

      await sendLog(
        { title: `${pendingReview} Nickname Changed`, action: "Member Updated (Nickname)", change: `${oldNick} ---> ${newNick}`, color: "YELLOW" },
        client,
        message
      )

      await rply.edit({
        content: `${tickEmoji} Successfully changed **${target.user.tag}'s** nickname.`,
      });
    }
  },
};
