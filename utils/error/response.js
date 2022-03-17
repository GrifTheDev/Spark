"use strict"
const { MessageEmbed } = require("discord.js");
const { colors, timeToDeleteMessages, emojis } = require("../../config");
const { error_color } = colors
const { XEmoji } = emojis

async function respondWithError({
  message: message,
  interaction: interaction,
  errorMessage: errorMessage,
}) {

  if (message != undefined && interaction == undefined) {
    const errorEmbed = new MessageEmbed()
    .setColor(error_color)
    .setDescription(`${XEmoji} ` + errorMessage);

  message
    .reply({
      embeds: [errorEmbed]
    })
    .then((sentMsg) => {
        setTimeout(() => {
            if (message.deletable == true && sentMsg.deletable == true) {
                message.delete()
                sentMsg.delete()
            }
        }, timeToDeleteMessages);
      
    });
  } else if (message == undefined && interaction != undefined) {
    const errorEmbed = new MessageEmbed()
    .setColor(error_color)
    .setDescription(`${XEmoji} ` + errorMessage);

    interaction.followUp({
      embeds: [errorEmbed]
    })
  } else {
    console.log("huh")
  }
  
}

module.exports = respondWithError;
