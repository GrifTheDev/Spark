const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, CommandInteraction } = require("discord.js");
const achievementProfile = require("../../../utils/database/schemas/achievements");
const { introductionChannelId } = require("../../../config");
const reputationProfile = require("../../../utils/database/schemas/reputation")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reputation")
    .setDescription("Returns your reputation.")
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
        const query = await reputationProfile.findOne({ _id: interaction.user.id }).exec()

        await interaction.followUp({
            content: `You have **${query.repAmount}** reputation.`,
        })

  }
};
