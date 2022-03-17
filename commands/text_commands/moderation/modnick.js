const {
  Message,
  Client,
  MessageActionRow,
  MessageButton
} = require("discord.js");
const { emojis, colors } = require("../../../config");
const { error_color } = colors
const { XEmoji, tickEmoji, loading, pendingReview } = emojis;
const randomId = require("../../../utils/randomId");
const respondWithError = require("../../../utils/error/response");
const { sendLog, sendErrorLog } = require("../../../utils/log");

module.exports = {
  name: "modnick",
  desc: "Moderates the provided member's nickname into a pingable tag.",
  aliases: ["mn", "pingable", "modtag"],
  permissionLevel: 2,

  /**
   *
   * @param {Client} client
   * @param {Message} message
   */

  async execute(client, message, args) {
    const target =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!target) {
      return respondWithError({
        message: message,
        errorMessage: `Please provide a member who's nickname you want to moderate.`
      });
    }

    const msg = await message.reply({
      content: `${loading} Moderating nickname...`
    });

    const Id = await randomId(7);
    const newTag = "Pingable Tag " + Id;
    const oldTag = target.nickname || target.user.username;

    try {
      await target.setNickname(newTag);
      await msg.edit({
        content: `${tickEmoji} Successfully moderated **${oldTag}'s** nickname to **${newTag}**.`
      });
    } catch (error) {

      var sentLog = await sendErrorLog(
        { command: "Modnick", error: error },
        message,
        client
      );
      await msg.edit({
        content: `${XEmoji} Command execution **failed**. The client responded with an error.`,
        components: [
          new MessageActionRow().addComponents(
            new MessageButton()
              .setStyle("LINK")
              .setURL(sentLog.url)
              .setLabel("Go to Log")
          )
        ]
      });
      return;
    }

    await sendLog(
      {
        title: `${pendingReview} Nickname Moderated`,
        action: `Nickname Moderation (<@${target.user.id}>)`,
        change: `${oldTag} ---> ${newTag}`,
        color: "ORANGE"
      },
      client,
      message
    );
  }
};
