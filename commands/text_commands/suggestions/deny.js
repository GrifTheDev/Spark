const { Message, Client } = require("discord.js");
const respondWithError = require("../../../utils/error/response");
const SuggestionManager = require("../../../structures/SuggestionManager");

module.exports = {
  name: "deny",
  desc: "Marks a suggestion as denied.",
  aliases: ["reject"],
  permissionLevel: 3,

  /**
   *
   * @param {Client} client
   * @param {Message} message
   */

  async execute(client, message, args) {
    let suggestionId = args[0];
    let reason = args.slice(1).join(" ");

    if (!suggestionId) {
      return respondWithError({
        message: message,
        errorMessage: `Please provide a valid suggestion ID.`
      });
    }

    if (!reason) {
      return respondWithError({
        message: message,
        errorMessage: `Please provide a reason for approving this suggestion.`
      });
    }

    new SuggestionManager({
      suggestionId: suggestionId
    }).denySuggestion({
      message: message,
      reason: reason
    });
  }
};
