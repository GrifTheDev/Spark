const suggestionEntry = require("../utils/database/schemas/suggestions");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { suggestionChannelId, emojis } = require("../config");
const { pendingReview, tickEmoji, XEmoji } = emojis;
const respondWithError = require("../utils/error/response");
const userProfile = require("../utils/database/schemas/user");
const AchievementManager = require("./AchievementManager");
const logger = require("../utils/logging/logger");
const BitManager = require("./BitManager");

class SuggestionManager {
  constructor({
    interaction: interaction,
    suggestion: suggestion,
    suggestionId: suggestionId
  }) {
    if (interaction != undefined) this.interaction = interaction;

    if (suggestion != undefined) this.suggestion = suggestion;

    if (suggestionId != undefined) this.suggestionId = suggestionId;
  }

  async createSuggestion() {
    await this.sendAndReply();
    await this.writeNewSuggestion();
  }

  async sendAndReply() {
    var suggestion = this.interaction.options.getString("suggestion");

    const SuggestionEmbed = new MessageEmbed()
      .setAuthor({
        name: `Suggestion by ${this.interaction.user.username}`,
        iconURL: this.interaction.user.displayAvatarURL({ dynamic: true })
      })
      .setDescription(`**Suggestion**\n${suggestion}`)
      .addField("Status", `${pendingReview} Pending Review`)
      .setFooter({
        text: `Suggestion ID: ${this.suggestionId}`
      })
      .setTimestamp()
      .setColor("YELLOW");

    var suggestionChannel = await this.interaction.guild.channels.cache.get(
      suggestionChannelId
    );
    var sentMsg = await suggestionChannel.send({
      embeds: [SuggestionEmbed]
    });

    this.sentMsg = sentMsg;

    await sentMsg.react("928690859929636885");
    await sentMsg.react("928690859866730550");

    await this.interaction.followUp({
      content: `${tickEmoji} Your [suggestion](${this.sentMsg.url}) has been submited!`
    });
  }

  async writeNewSuggestion() {
    var suggestion = this.interaction.options.getString("suggestion");

    var createSuggestionDB = await suggestionEntry.create({
      _id: this.suggestionId,
      authorName: this.interaction.user.username,
      authorID: this.interaction.user.id,
      authorPFP: this.interaction.user.displayAvatarURL({ dynamic: true }),
      suggestionStatus: "Pending Review",
      suggestion: suggestion,
      suggestionURL: this.sentMsg.url,
      lastSuggestionEditTimestamp: "N/A",
      suggestionTimestamp: Math.floor(Date.now() / 1000).toString(),
      messageID: this.sentMsg.id,
      suggestionID: this.suggestionId
    });

    try {
      await createSuggestionDB.save();
    } catch (error) {
      logger.warn(
        `There was an error while trying to save ${this.interaction.user.username}'s suggestion.\n\n${error}. Approving / denying the suggestion without adding the DB entry manually will cause a crash.`
      );
    }
  }

  async approveSuggestion({ message: message, reason: reason }) {
    var query = await suggestionEntry.findOne({ _id: this.suggestionId }).exec();

    if (query == null || query == undefined) {
      return await respondWithError({
        message: message,
        errorMessage: `The Suggestion ID provided is not a valid ID, please double check the provided ID and try again.`
      });
    }

    if (message.channel.id != suggestionChannelId) {
      return await respondWithError({
        message: message,
        errorMessage: `Please run this command in the suggestion channel.`
      });
    }

    var oldSuggestion = await message.channel.messages.fetch(query.messageID);

    const acceptedEmbed = new MessageEmbed()
      .setAuthor({
        name: `Suggestion by ${query.authorName}`,
        iconURL: query.authorPFP
      })
      .setDescription(`**Suggestion**\n${query.suggestion}`)
      .addField("Status", `${tickEmoji} Approved`)
      .addField("Reason", reason)
      .addField("Approved By", `<@${message.author.id}>`)
      .setFooter({ text: `Suggestion ID: ${query.suggestionID}` })
      .setTimestamp()
      .setColor("GREEN");

    oldSuggestion.edit({ content: " ", embeds: [acceptedEmbed] });

    var user = message.guild.members.cache.get(query.authorID);

    try {
      const DMEmbed = new MessageEmbed()
        .setDescription(
          `${tickEmoji} Your suggestion in Student Zone has been approved! *(+0.5 Rep)*`
        )
        .setColor("GREEN");

      await user.send({
        embeds: [DMEmbed],
        components: [
          new MessageActionRow().addComponents(
            new MessageButton()
              .setLabel("Go to Suggestion")
              .setStyle("LINK")
              .setURL(query.suggestionURL)
          )
        ]
      });
    } catch (error) {
      logger.warn(`Could not notify ${user.user.tag} about their suggestion approval.\n\n${error}`);
    }

    let updateEntry = await suggestionEntry.findOneAndUpdate(
      {
        _id: this.suggestionId
      },
      {
        suggestionStatus: "Approved"
      }
    );

    try {
      await updateEntry.save();
    } catch (error) {
      console.log(error);
    }

    var profile = await userProfile.findOne({ _id: user.id }).exec();

    if (profile == null || profile == undefined) {
      return console.log("Could not access db profile!");
    } else if (profile.hasApprovedSuggestion == false) {

      var changeProfile = await userProfile.findOneAndUpdate(
        {
          _id: user.id
        },
        {
          hasApprovedSuggestion: true
        }
      );
  
      try {
        await changeProfile.save()
      } catch (error) {
        console.log(error)
      }
  
      await new AchievementManager({message: oldSuggestion}).turningTheGears(user.user.id)

      await new BitManager().addBits({member: user.user, toAdd: 1})
    }

    
    
  }

  async denySuggestion({ message: message, reason: reason }) {
    var query = await suggestionEntry.findOne({ _id: this.suggestionId }).exec();

    if (query == null || query == undefined) {
      return await respondWithError({
        message: message,
        errorMessage: `The Suggestion ID provided is not a valid ID, please double check the provided ID and try again.`
      });
    }

    if (message.channel.id != suggestionChannelId) {
      return await respondWithError({
        message: message,
        errorMessage: `Please run this command in the suggestion channel.`
      });
    }

    var oldSuggestion = await message.channel.messages.fetch(query.messageID);

    const denyEmbed = new MessageEmbed()
      .setAuthor({
        name: `Suggestion by ${query.authorName}`,
        iconURL: query.authorPFP
      })
      .setDescription(`**Suggestion**\n${query.suggestion}`)
      .addField("Status", `${XEmoji} Denied`)
      .addField("Reason", reason)
      .addField("Denied By", `<@${message.author.id}>`)
      .setFooter({ text: `Suggestion ID: ${query.suggestionID}` })
      .setTimestamp()
      .setColor("RED");

    oldSuggestion.edit({ content: " ", embeds: [denyEmbed] });

    var user = message.guild.members.cache.get(query.authorID);

    try {
      const DMEmbed = new MessageEmbed()
        .setDescription(
          `${XEmoji} Your suggestion in Student Zone has been denied. *(+0.5 Rep)*`
        )
        .setColor("RED");

      await user.send({
        embeds: [DMEmbed],
        components: [
          new MessageActionRow().addComponents(
            new MessageButton()
              .setLabel("Go to Suggestion")
              .setStyle("LINK")
              .setURL(query.suggestionURL)
          )
        ]
      });
    } catch (error) {
      console.log(error);
    }

    let updateEntry = await suggestionEntry.findOneAndUpdate(
      {
        _id: this.suggestionId
      },
      {
        suggestionStatus: "Denied"
      }
    );

    try {
      await updateEntry.save();
    } catch (error) {
      console.log(error);
    }
  }

  async editSuggestion() {
    var query = await suggestionEntry.findOne({
      _id: this.interaction.options.getString("suggestion_id")
    });

    if (query == null || query == undefined) {
      return await respondWithError({
        interaction: this.interaction,
        errorMessage: `The Suggestion ID provided is not a valid ID, please double check the provided ID and try again.`
      });
    }

    if (query.authorID != this.interaction.user.id) {
      return await respondWithError({
        interaction: this.interaction,
        errorMessage: `You can only edit your own suggestions!`
      });
    }

    if (query.suggestionStatus != "Pending Review") {
      return await respondWithError({
        interaction: this.interaction,
        errorMessage: `You cannot edit suggestions that have already been reviewed!`
      });
    }

    var to_edit = this.interaction.options.getString("to_edit");
    var suggestionChannel = await this.interaction.guild.channels.cache.get(
      suggestionChannelId
    );

    var oldSuggestion = await suggestionChannel.messages.fetch(query.messageID);
    var timestamp = Math.floor(Date.now() / 1000);

    const newSuggestion = new MessageEmbed()
      .setAuthor({
        name: `Suggestion by ${this.interaction.user.username}`,
        iconURL: this.interaction.user.displayAvatarURL({ dynamic: true })
      })
      .setDescription(`**Suggestion**\n${to_edit}`)
      .addField("Status", `${pendingReview} Pending Review`)
      .setFooter({
        text: `Suggestion ID: ${query.suggestionID}`
      })
      .addField("Edited", `<t:${timestamp}:f>`)
      .setTimestamp()
      .setColor("YELLOW");

    oldSuggestion.edit({
      content: " ",
      embeds: [newSuggestion]
    });

    let updateTime = await suggestionEntry.findOneAndUpdate(
      {
        _id: this.interaction.options.getString("suggestion_id")
      },
      {
        lastSuggestionEditTimestamp: timestamp
      }
    );

    try {
      await updateTime.save();
    } catch (error) {
      console.log(error);
    }

    try {
      let updateSuggestion = await suggestionEntry.findOneAndUpdate(
        {
          _id: this.interaction.options.getString("suggestion_id")
        },
        {
          suggestion: to_edit
        }
      );

      updateSuggestion.save();
    } catch (error) {
      console.log(error);
    }

    this.interaction.followUp({
      content: `${tickEmoji} Your [suggestion](${oldSuggestion.url}) has been updated.`
    });
  }
}

module.exports = SuggestionManager;
