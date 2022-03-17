const { SlashCommandBuilder } = require("@discordjs/builders");
const SuggestionManager = require("../../../structures/SuggestionManager");
const generateId = require("../../../utils/randomId");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("suggestion")
    .addSubcommand((subcommand) =>
      subcommand
        .addStringOption((option) =>
          option
            .setName("suggestion")
            .setDescription("Put what you want to suggest here.")
            .setRequired(true)
        )
        .setName("create")
        .setDescription("Submit a suggestion for the server.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .addStringOption((option) =>
          option
            .setName("suggestion_id")
            .setDescription(
              "The ID of the suggestion. Can be found in the suggestion footer."
            )
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("to_edit")
            .setDescription("What you want to change the suggestion to.")
            .setRequired(true)
        )
        .setName("edit")
        .setDescription("Edit a suggestion by its ID.")
    )
    .setDescription("Manage suggestions."),

  cooldown: 60,
  async execute(interaction, client) {
    const selectedSubCommand = interaction.options.getSubcommand();

    switch (selectedSubCommand) {
      case "create":
        const suggestionId = await generateId(7);

        new SuggestionManager({
          interaction: interaction,
          suggestionId: suggestionId
        }).createSuggestion();

        break;
      case "edit":
        new SuggestionManager({
          interaction: interaction
        }).editSuggestion();

        break;
    }
  }
};
