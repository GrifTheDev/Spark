const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const bitsProfile = require("../../../utils/database/schemas/bits");
const logger = require("../../../utils/logging/logger");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bits")
    .setDescription("Returns your bits.")
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
    const query = await bitsProfile
      .findOne({ _id: interaction.user.id })
      .exec() || { bits: 0, log: [] }

    const bits = query.bits;
    const logs = query.log;
    var stringForActions = "";

    if (logs.length > 0) {
    for (var i = logs.length - 1; i > -1; i--) {
      // arr[i]
      if (logs[i].action == "Bit Gain") {
        stringForActions += `<:upVote:928690859929636885> ${logs[i].action}: ${logs[i].changed} bits (<t:${logs[i].timestamp}:f>)\n`;
      } else if (logs[i].action == "Bit Remove") {
        stringForActions += `<:downVote:928690859866730550> ${logs[i].action}: ${logs[i].changed} bits (<t:${logs[i].timestamp}:f>)\n`;
      }

      /* {
        action: "Bit Gain",
        changed: this.baseBits * query.multiplier * this.globalMultiplier,
        timestamp: Math.trunc(Date.now() / 1000)
      } */
    }
    } else {
      stringForActions = "*Nothing to show here yet.*";
    }


    const embed = new MessageEmbed()
      .setTitle("Bit Profile")
      .setDescription(
        `**__Bit Amount__**\nYou have **${bits} bits**.\n\n**__Logs__**\nMaximum amount of logs that can be displayed is 5.\n\n${stringForActions}`
      )
      .setColor("YELLOW");

    await interaction.followUp({
      embeds: [embed],
    });
  },
};
