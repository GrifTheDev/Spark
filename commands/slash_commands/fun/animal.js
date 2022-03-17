const { SlashCommandBuilder } = require("@discordjs/builders");
const { colors } = require("../../../config");
const { color } = colors;
const { MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("animal")
    .setDescription("Gives the image of the specified animal.")
    .addSubcommand((subcommand) =>
      subcommand
        .addBooleanOption((option) =>
          option.setName("hidden").setDescription("Make the reply hidden.")
        )
        .setName("cat")
        .setDescription("Gives you a cat picture.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .addBooleanOption((option) =>
          option.setName("hidden").setDescription("Make the reply hidden.")
        )
        .setName("dog")
        .setDescription("Gives you a dog picture.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .addBooleanOption((option) =>
          option.setName("hidden").setDescription("Make the reply hidden.")
        )
        .setName("fox")
        .setDescription("Gives you a fox picture.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .addBooleanOption((option) =>
          option.setName("hidden").setDescription("Make the reply hidden.")
        )
        .setName("bunny")
        .setDescription("Gives you a bunny picture.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .addBooleanOption((option) =>
          option.setName("hidden").setDescription("Make the reply hidden.")
        )
        .setName("duck")
        .setDescription("Gives you a duck picture.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .addBooleanOption((option) =>
          option.setName("hidden").setDescription("Make the reply hidden.")
        )
        .setName("lizard")
        .setDescription("Gives you a lizard picture.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .addBooleanOption((option) =>
          option.setName("hidden").setDescription("Make the reply hidden.")
        )
        .setName("shiba")
        .setDescription("Gives you a shiba picture.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .addBooleanOption((option) =>
          option.setName("hidden").setDescription("Make the reply hidden.")
        )
        .setName("koala")
        .setDescription("Gives you a koala picture.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .addBooleanOption((option) =>
          option.setName("hidden").setDescription("Make the reply hidden.")
        )
        .setName("bird")
        .setDescription("Gives you a bird picture.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .addBooleanOption((option) =>
          option.setName("hidden").setDescription("Make the reply hidden.")
        )
        .setName("raccoon")
        .setDescription("Gives you a raccoon picture.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .addBooleanOption((option) =>
          option.setName("hidden").setDescription("Make the reply hidden.")
        )
        .setName("kangaroo")
        .setDescription("Gives you a kangaroo picture.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .addBooleanOption((option) =>
          option.setName("hidden").setDescription("Make the reply hidden.")
        )
        .setName("panda")
        .setDescription("Gives you a panda picture.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .addBooleanOption((option) =>
          option.setName("hidden").setDescription("Make the reply hidden.")
        )
        .setName("red_panda")
        .setDescription("Gives you a red panda picture.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .addBooleanOption((option) =>
          option.setName("hidden").setDescription("Make the reply hidden.")
        )
        .setName("monkey")
        .setDescription("Gives you a monkey picture.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .addBooleanOption((option) =>
          option.setName("hidden").setDescription("Make the reply hidden.")
        )
        .setName("axolotl")
        .setDescription("Gives you an axolotl picture.")
    ),
  cooldown: 3,
  async execute(interaction, client) {
    const subcmd = interaction.options.getSubcommand();

    switch (subcmd) {
      case "cat":
        axios.get("https://some-random-api.ml/animal/cat").then(async (res) => {
          const CatEmbed = new MessageEmbed()
            .setColor(color)
            .setImage(res.data.image)
            .setDescription("Fact: " + res.data.fact)
            .setFooter({
              text: "Source: https://some-random-api.ml/animal/cat"
            });

          interaction.followUp({ embeds: [CatEmbed] });
        });
        break;

      case "dog":
        axios.get("https://some-random-api.ml/animal/dog").then(async (res) => {
          const DogEmbed = new MessageEmbed()
            .setColor(color)
            .setImage(res.data.image)
            .setDescription("Fact: " + res.data.fact)
            .setFooter({
              text: "Source: https://some-random-api.ml/animal/dog"
            });

          interaction.followUp({ embeds: [DogEmbed] });
        });
        break;

      case "fox":
        axios.get("https://some-random-api.ml/animal/fox").then(async (res) => {
          const DogEmbed = new MessageEmbed()
            .setColor(color)
            .setImage(res.data.image)
            .setDescription("Fact: " + res.data.fact)
            .setFooter({
              text: "Source: https://some-random-api.ml/animal/fox"
            });

          interaction.followUp({ embeds: [DogEmbed] });
        });
        break;

      case "bunny":
        axios
          .get("https://api.bunnies.io/v2/loop/random/?media=webm")
          .then(async (res) => {
            const BunnyEmbed = new MessageEmbed()
              .setColor(color)
              .setImage(res.data.media.poster)
              .setFooter({
                text:
                  "Times Served: " +
                  res.data.totalServed +
                  " | Source: https://api.bunnies.io/v2/loop/random/?media=webm"
              });

            interaction.followUp({ embeds: [BunnyEmbed] });
          });
        break;

      case "duck":
        axios
          .get("https://random-d.uk/api/v1/random?type=png")
          .then(async (res) => {
            const DuckEmbed = new MessageEmbed()
              .setColor(color)
              .setImage(res.data.url)
              .setFooter({ text: res.data.message });

            interaction.followUp({ embeds: [DuckEmbed] });
          });
        break;

      case "lizard":
        axios.get("https://nekos.life/api/v2/img/lizard").then(async (res) => {
          const LizardEmbed = new MessageEmbed()
            .setColor(color)
            .setImage(res.data.url)
            .setFooter({
              text: "Source: https://nekos.life/api/v2/img/lizard"
            });

          interaction.followUp({ embeds: [LizardEmbed] });
        });
        break;

      case "shiba":
        axios.get("http://shibe.online/api/shibes").then(async (res) => {
          const LizardEmbed = new MessageEmbed()
            .setColor(color)
            .setImage(res.data[0])
            .setFooter({ text: "Source: http://shibe.online/api/shibes" });

          interaction.followUp({ embeds: [LizardEmbed] });
        });
        break;

      case "koala":
        axios.get("https://some-random-api.ml/img/koala").then(async (res) => {
          const KoalaEmbed = new MessageEmbed()
            .setColor(color)
            .setImage(res.data.link)
            .setFooter({
              text: "Source: https://some-random-api.ml/img/koala"
            });

          interaction.followUp({ embeds: [KoalaEmbed] });
        });
        break;

      case "bird":
        axios
          .get("https://some-random-api.ml/animal/birb")
          .then(async (res) => {
            const BirdEmbed = new MessageEmbed()
              .setColor(color)
              .setImage(res.data.image)
              .setDescription("Fact: " + res.data.fact)
              .setFooter({
                text: "Source: https://some-random-api.ml/animal/birb"
              });

            interaction.followUp({ embeds: [BirdEmbed] });
          });
        break;

      case "raccoon":
        axios
          .get("https://some-random-api.ml/animal/raccoon")
          .then(async (res) => {
            const RaccoonEmbed = new MessageEmbed()
              .setColor(color)
              .setImage(res.data.image)
              .setDescription("Fact: " + res.data.fact)
              .setFooter({
                text: "Source: https://some-random-api.ml/animal/raccoon"
              });

            interaction.followUp({ embeds: [RaccoonEmbed] });
          });
        break;

      case "kangaroo":
        axios
          .get("https://some-random-api.ml/animal/kangaroo")
          .then(async (res) => {
            const KangarooEmbed = new MessageEmbed()
              .setColor(color)
              .setImage(res.data.image)
              .setDescription("Fact: " + res.data.fact)
              .setFooter({
                text: "Source: https://some-random-api.ml/animal/kangaroo"
              });

            interaction.followUp({ embeds: [KangarooEmbed] });
          });
        break;

      case "panda":
        axios
          .get("https://some-random-api.ml/animal/panda")
          .then(async (res) => {
            const PandaEmbed = new MessageEmbed()
              .setColor(color)
              .setImage(res.data.image)
              .setDescription("Fact: " + res.data.fact)
              .setFooter({
                text: "Source: https://some-random-api.ml/animal/panda"
              });

            interaction.followUp({ embeds: [PandaEmbed] });
          });
        break;

      case "red_panda":
        axios
          .get("https://some-random-api.ml/animal/red_panda")
          .then(async (res) => {
            const RedPandaEmbed = new MessageEmbed()
              .setColor(color)
              .setImage(res.data.image)
              .setDescription("Fact: " + res.data.fact)
              .setFooter({
                text: "Source: https://some-random-api.ml/animal/red_panda"
              });

            interaction.followUp({ embeds: [RedPandaEmbed] });
          });
        break;

      case "monkey":
        axios
          .get("https://api.monkedev.com/attachments/monkey")
          .then(async (res) => {
            const MonkeyEmbed = new MessageEmbed()
              .setColor(color)
              .setImage(res.data.url)
              .setFooter({
                text: "Source: https://api.monkedev.com/attachments/monkey"
              });

            interaction.followUp({ embeds: [MonkeyEmbed] });
          });
        break;

      case "axolotl":
        axios.get("https://axoltlapi.herokuapp.com/").then(async (res) => {
          const AxolotlEmbed = new MessageEmbed()
            .setColor(color)
            .setImage(res.data.url)
            .setDescription("Fact: " + res.data.facts)
            .setFooter({ text: "Source: https://axoltlapi.herokuapp.com/" });
        

        interaction.followUp({ embeds: [AxolotlEmbed] });
      });
        break;
    }
  }
};
