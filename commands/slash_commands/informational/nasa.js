const { SlashCommandBuilder } = require("@discordjs/builders");
const { colors, apiKeys } = require("../../../config");
// eslint-disable-next-line no-undef
const nasaKey = process.env.nasaKey
const { color } = colors;
const { MessageEmbed } = require("discord.js");
const axios = require("axios");
const respondWithError = require("../../../utils/error/response")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nasa")
    .setDescription("Nasa Commands.")
    .addSubcommand((subcommand) =>
      subcommand
        .addBooleanOption((option) =>
          option.setName("hidden").setDescription("Make the reply hidden.")
        )
        .setName("picture-of-the-day")
        .setDescription("Returns the Astronomy Picture of the Day.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .addIntegerOption((option) =>
          option
            .setMaxValue(3393)
            .setMinValue(1)
            .setName("sol")
            .setDescription("THe wanted solar day of the image.")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option.setName("hidden").setDescription("Make the reply hidden.")
        )
        .setName("mars-curiosity-images")
        .setDescription("Returns images from the curiosity rover.")
    ),
  cooldown: 5,
  async execute(interaction, client) {
    const subcmd = interaction.options.getSubcommand();

    switch (subcmd) {
      case "picture-of-the-day":
        axios
          .get("https://api.nasa.gov/planetary/apod?api_key=" + nasaKey)
          .then(async (res) => {
            const resEmbed = new MessageEmbed()
              .setTitle(res.data.title)
              .setColor(color)
              .setImage(res.data.hdurl)
              .setDescription(res.data.explanation)
              .setFooter({
                text:
                  "Media Type: " +
                  res.data.media_type +
                  " | Date: " +
                  res.data.date +
                  " | Service Version: " +
                  res.data.service_version
              });

            interaction.followUp({
              embeds: [resEmbed]
            });
          });

        break;

      case "mars-curiosity-images":
        // eslint-disable-next-line no-case-declarations
        const sol = interaction.options.getInteger("sol");
        // eslint-disable-next-line no-case-declarations
        const reqURL =
          "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=" +
          nasaKey +
          "&sol=" +
          sol.toString();

        axios.get(reqURL).then(async (res) => {
          if (res.data.photos.length > 0) {
              const resEmbed = new MessageEmbed()
              .setTitle("Curiosity rover image from SOL " + sol.toString())
              .setImage(res.data.photos[0].img_src)

              interaction.followUp({
                  embeds: [resEmbed]
              })
          } else {
            await respondWithError({
                interaction: interaction,
                errorMessage: "You can only query images before SOL 3393."
            })
          }
        });
    }
  }
};
