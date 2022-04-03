const {
  Message,
  Client,
  MessageEmbed,
  MessageButton,
  MessageActionRow,
} = require("discord.js");
const { colors } = require("../../../config");
const { color } = colors;

module.exports = {
  name: "verify",
  desc: "Summons the verify embed and button.",
  permissionLevel: 6,

  /**
   *
   * @param {Client} client
   * @param {Message} message
   */

  async execute(client, message) {
    const embed = new MessageEmbed()
      .setColor(color)
      .setTitle("Server Verification")
      .setDescription(
        "Please click the button below to verify yourself and gain access to the server."
      );

    message.channel.send({
      embeds: [embed],
      components: [
        new MessageActionRow().setComponents(
          new MessageButton()
            .setLabel("Verify")
            .setStyle("PRIMARY")
            .setCustomId("verify_button")
        ),
      ],
    });
  },
};
