const { Message, Client, MessageEmbed } = require("discord.js");
const { infoMessages } = require("../../../messages/info_messages");
const { emojis } = require("../../../config");
const respondWithError = require("../../../utils/error/response");
const ReputationManager = require("../../../structures/ReputationManager");
const { loading, tickEmoji } = emojis;

module.exports = {
  name: "give",
  desc: "Gives the mentioned member a specified amount of rep.",
  aliases: ["gv"],
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

    const toGive = args[1];

    if (!target) {
      return await respondWithError({
        message: message,
        errorMessage: "You must specify a member to give the reputation to.",
      });
    }

    if (!toGive) {
      return await respondWithError({
        message: message,
        errorMessage: "You must specify the amount of reputation to give.",
      });
    }

    var res = await message.reply({
        content: `${loading} Giving reputation to **${target.user.tag}**...`
    })

    await new ReputationManager({ toGive: Number(toGive), message: message }).giveCertainRep();

    await res.edit({
        content: `${tickEmoji} Gave **${toGive} reputation** to **${target.user.tag}**.`
    })
  },
};
