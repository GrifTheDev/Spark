const {
  Message,
  Client,
  MessageButton,
  MessageActionRow,
} = require("discord.js");
module.exports = {
  name: "select-roles",
  desc: "Prints out a role selection.",
  aliases: ["sr"],
  cooldown: 10,
  permissionLevel: 5,

  /**
   *
   * @param {Client} client
   * @param {Message} message
   */

  async execute(client, message) {

    const pronounButton = new MessageButton()
      .setCustomId("pronoun_button")
      .setLabel("Choose your Pronouns")
      .setStyle("PRIMARY")
      .setEmoji("917839282947915776");

    const rowPronoun = new MessageActionRow().addComponents(pronounButton);

    message.channel.send({
      components: [rowPronoun],
      content:
        "Identity is important and you deserve to present yourself however you want. Click the button below to get your pronoun roles.",
    });

    const pingButton = new MessageButton()
    .setCustomId("ping_button")
    .setLabel("Choose Pings")
    .setStyle('PRIMARY')
    .setEmoji('682341298388467739')

    const rowGender = new MessageActionRow().addComponents(pingButton);

    message.channel.send({
      components: [rowGender],
      content:
        "Pings can be **__annoying__**! Sure, pinging everyone here and there isn't that bad, but when you can't choose the pings you are interested in, you feel as though someone put the milk before the cereal. Well, look no further! This select menu is for you.",
    });

    const educationLevelButton = new MessageButton()
    .setCustomId('select_eduLevel')
    .setLabel('Choose your Education Level')
    .setStyle('PRIMARY')
    .setEmoji('⭐')

    const educationLevelRow = new MessageActionRow().addComponents(educationLevelButton)

    message.channel.send({
      components: [educationLevelRow],
      content:
        "Wow you go to High School? That's so cool! If only there was a select menu that would allow you to pick your education level. :thinking:"
    })

  },
};
