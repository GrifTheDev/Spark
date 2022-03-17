const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, CommandInteraction } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Returns the bot ping.")
    .addBooleanOption((option) =>
      option.setName("hidden").setDescription("Make the reply hidden.")
    ),
  cooldown: 10,

  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */

  async execute(interaction, client) {
    await interaction.followUp({
      content: `<a:loop:919687254727884850> Retrieving GET Request time...`,
    });

    var msgEditStart = Date.now();

    await interaction.editReply({
      content: `<a:loop:919687254727884850> Retrieving Message Edit time...`,
    });

    var msgEditEnd = Date.now();
    var msgEditTime = msgEditEnd - msgEditStart;

    await interaction.editReply({
      content: `<a:loop:919687254727884850> Retrieving Client Websocket ping...`,
    });

    var clientPing = client.ws.ping;

    await interaction.editReply({
      content: `<:client_ping:919707052127948920> The websocket ping is **${clientPing} ms** and the message edit time is **${msgEditTime} ms**.`,
    });
  },
};
