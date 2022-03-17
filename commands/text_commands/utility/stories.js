const { Message, Client, MessageEmbed } = require("discord.js");
const respondWithError = require("../../../utils/error/response");
const AchievementManager = require("../../../structures/AchievementManager");
const { emojis } = require("../../../config");
const { tickEmoji, loading } = emojis;

module.exports = {
  name: "stories",
  desc: "Grants the `I've got stories` achievement to the mentioned user.",
  aliases: ["st"],
  permissionLevel: 2,

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  async execute(client, message, args) {
    const target =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!target)
      return respondWithError({
        message: message,
        errorMessage: "You must specify a member to give the achievement to."
      });

    var response = await message.reply({
      content: `${loading} Granting achievement...`
    });
    await new AchievementManager({ message: message }).iveGotStories(
      target.user.id,
      response
    );
  }
};
