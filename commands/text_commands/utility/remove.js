const { Message, Client } = require("discord.js");
const { emojis } = require("../../../config");
const respondWithError = require("../../../utils/error/response");
const BitManager = require("../../../structures/BitManager");
const { loading, tickEmoji } = emojis;

module.exports = {
  name: "remove",
  desc: "Removes the specified amount of bits from the mentioned member.",
  aliases: ["rm"],
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

    const toRemove = args[1];

    if (!target) {
      return await respondWithError({
        message: message,
        errorMessage: "You must specify a member to give the reputation to.",
      });
    }

    if (!toRemove) {
      return await respondWithError({
        message: message,
        errorMessage: "You must specify the amount of reputation to give.",
      });
    }

    var res = await message.reply({
        content: `${loading} Removing reputation from **${target.user.tag}**...`
    })
    await new BitManager().addBits({member: target.user, toAdd: -(Number(toRemove))})

    await res.edit({
        content: `${tickEmoji} Removed **${toRemove} reputation** from **${target.user.tag}**.`
    })
  },
};