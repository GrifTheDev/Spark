const cooldowns = new Map();
const { Collection, MessageEmbed } = require("discord.js")
const { colors, timeToDeleteMessages } = require("../../config")
const { error_color, color } = colors


async function cooldownChecker(commandData, message) {
  if (!cooldowns.has(commandData.name)) {
    cooldowns.set(commandData.name, new Collection());
  }

  const CurrentTime = Date.now();
  const TimeStamps = cooldowns.get(commandData.name);
  const CooldownAmount = commandData.cooldown * 1000;

  if (TimeStamps.has(message.author.id)) {
    const ExpirationTime = TimeStamps.get(message.author.id) + CooldownAmount;

    if (CurrentTime < ExpirationTime) {
      const TimeLeft = (ExpirationTime - CurrentTime) / 1000;

      message.delete();

      const CooldownEmbed = new MessageEmbed()
        .setDescription(
          `You are on cooldown! You can use the ` +
            "`" +
            `${commandData.name}` +
            "` command in " +
            "`" +
            `${TimeLeft.toFixed(1)}` +
            "` seconds."
        )
        .setColor(error_color);

      await message.reply({ embeds: [CooldownEmbed] }).then((sentMsg) => {
        setTimeout(() => {

            if (sentMsg.deletable == true) {
                sentMsg.delete();
            }
          
        }, timeToDeleteMessages);
      });

      return "1"
    }
  }

  TimeStamps.set(message.author.id, CurrentTime);

  setTimeout(() => TimeStamps.delete(message.author.id), CooldownAmount);
}

module.exports = cooldownChecker;
