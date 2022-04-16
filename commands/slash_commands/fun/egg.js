const { SlashCommandBuilder } = require("@discordjs/builders");
const { Interaction, Client } = require("discord.js");
const SuggestionManager = require("../../../structures/SuggestionManager");
const generateId = require("../../../utils/randomId");

/**
 * @param {Client} client
 * @param {Interaction} interaction
 */

module.exports = {
  data: new SlashCommandBuilder()
    .setName("egg-smash") 
    .setDescription("Engage in an epic egg smashing compettion.")
    .addUserOption((option) =>
    option
    .setName("opponent")
    .setDescription("The member you want to fight against.")
    .setRequired(true)),
  cooldown: 5,
  async execute(interaction, client) {
      const rival = interaction.options.getUser('opponent');

      await interaction.followUp({
          content: rival.user.username + " has challenged you to an epic egg smashing competition!",
      })
      
  }
};
