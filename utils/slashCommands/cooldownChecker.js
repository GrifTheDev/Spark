const cooldowns = new Map();
const { Collection, MessageEmbed } = require("discord.js")
const { colors, timeToDeleteMessages } = require("../../config")
const { error_color, color } = colors


async function cooldownChecker(commandData, interaction) {
  if (!cooldowns.has(commandData.data.name)) {
    cooldowns.set(commandData.data.name, new Collection());
  }

  const CurrentTime = Date.now();
  const TimeStamps = cooldowns.get(commandData.data.name);
  const CooldownAmount = commandData.cooldown * 1000;

  if (TimeStamps.has(interaction.user.id)) {
    const ExpirationTime = TimeStamps.get(interaction.user.id) + CooldownAmount;

    if (CurrentTime < ExpirationTime) {
      const TimeLeft = (ExpirationTime - CurrentTime) / 1000;

      const CooldownEmbed = new MessageEmbed()
        .setDescription(
          `<:slowmode_icon:928257720887418880> You are on cooldown! You can use the ` +
            "`" +
            `${commandData.data.name}` +
            "` command in " +
            "`" +
            `${TimeLeft.toFixed(1)}` +
            "` seconds."
        )
        .setColor(error_color);

      interaction.followUp({
          embeds: [CooldownEmbed]
      })

      return "1"
    }
  }

  TimeStamps.set(interaction.user.id, CurrentTime);

  setTimeout(() => TimeStamps.delete(interaction.user.id), CooldownAmount);
}

module.exports = cooldownChecker;
