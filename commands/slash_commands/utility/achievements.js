const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  Client,
  CommandInteraction,
  MessageEmbed,
  MessageSelectMenu,
  MessageActionRow
} = require("discord.js");
const { colors, emojis } = require("../../../config");
const AchievementManager = require("../../../structures/AchievementManager");
const { color } = colors;
const { tickEmoji, XEmoji } = emojis;
const achievementProfile = require("../../../utils/database/schemas/achievements");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("achievements")
    .setDescription("Lists all achievements.")
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
    const embed = new MessageEmbed()
      .setAuthor({
        iconURL:
          "https://cdn.discordapp.com/attachments/919686126506242050/946357600323272744/achievement.png",
        name: `Achievements for ${interaction.user.tag}`
      })
      .setColor(color)
      .setDescription(
        "Use the select menu to choose which tier of achievements you want to view."
      )
      .setTimestamp();

    const interactionId = interaction.id;

    const menuSend = new MessageSelectMenu()
      .setMinValues(0)
      .setMaxValues(1)
      .setCustomId("achievement_menu_" + interactionId)
      .setPlaceholder("Achievement Tier")
      .addOptions(
        {
          label: "Entry Tier",
          description: "Achievements that give 0.5 rep.",
          value: "entry_" + interactionId,
          emoji: "946712800473006081"
        },
        {
          label: "Noivce Tier",
          description: "Achievements that give 1.5 rep.",
          value: "noivce_" + interactionId,
          emoji: "946712800527519765"
        },
        {
          label: "Advanced Tier",
          description: "Achievements that give 2.5 rep.",
          value: "advanced_" + interactionId,
          emoji: "946712800384921601"
        },
        {
          label: "Mythical Tier",
          description: "Achievements that give 3.5 rep.",
          value: "mythical_" + interactionId,
          emoji: "946712800225550397"
        }
      );

    const row = new MessageActionRow().setComponents(menuSend);

    console.log("Interaction followed up");

    await interaction.followUp({
      embeds: [embed],
      components: [row]
    });

    console.log("Timeout started");

    const disableTimeout = setTimeout(() => {
      menuSend.setDisabled(true);
      interaction.editReply({
        components: [row]
      });
    }, 20000);
    client.on("interactionCreate", async (menu) => {
      if (!menu.isSelectMenu()) return;

      if (menu.customId == "achievement_menu_" + interactionId) {
        await menu.deferUpdate();

        disableTimeout.refresh();
        switch (menu.values[0]) {
          case "entry_" + interactionId:
            await new AchievementManager({
              message: interaction // passing in to avoid error, since for the below function it is not used
            }).returnEmbedByFilter({
              achievementTier: 1,
              achievementTierWords: "Entry", // used for embed
              memberId: menu.user.id
            });
            break;
          case "noivce_" + interactionId:
            await new AchievementManager({
              message: interaction // passing in to avoid error, since for the below function it is not used
            }).returnEmbedByFilter({
              achievementTier: 2,
              achievementTierWords: "Noivce",
              memberId: menu.user.id
            });
            break;
          case "advanced_" + interactionId:
            await new AchievementManager({
              message: interaction // passing in to avoid error, since for the below function it is not used
            }).returnEmbedByFilter({
              achievementTier: 3,
              achievementTierWords: "Advanced",
              memberId: menu.user.id
            });
            break;
          case "mythical_" + interactionId:
            await new AchievementManager({
              message: interaction // passing in to avoid error, since for the below function it is not used
            }).returnEmbedByFilter({
              achievementTier: 4,
              achievementTierWords: "Mythical",
              memberId: menu.user.id
            });
            break;
        }
      }
    });
  }
};
