const fs = require("fs");
const cooldownChecker = require("./cooldownChecker");
const { Interaction, MessageEmbed } = require("discord.js");
const { boosterRoleId, colors, emojis } = require("../../config");
const { error_color } = colors;
const { XEmoji } = emojis;

async function slashCommandLoader(client) {
  var amountOfCommands = 0;

  const directories = fs.readdirSync("./commands/slash_commands");

  for (const directory of directories) {
    const filesOfDirectory = fs.readdirSync(
      `./commands/slash_commands/${directory}`
    );

    for (const file of filesOfDirectory) {
      const command = require(`../../commands/slash_commands/${directory}/${file}`);

      client.slashCommands.set(command.data.name, command);
      amountOfCommands += 1;
    }
  }

  return amountOfCommands;
}

/**
 *
 * @param {Interaction} interaction
 */

async function slashCommandExecuter(commandData, client, interaction) {
  var hidden = interaction.options.getBoolean("hidden");

  if (hidden == null) {
    hidden = true;
  }

  await interaction.deferReply({ ephemeral: hidden }).catch(console.error);
  if (commandData.cooldown != undefined && !interaction.member.permissions.has("MANAGE_MESSAGES")) {
    const cooldownAllowed = await cooldownChecker(commandData, interaction);

    if (cooldownAllowed == 1) {
      return;
    }
  }

  if (commandData.boosterOnly != undefined && commandData.boosterOnly == true) {
    if (!interaction.member.roles.cache.has(boosterRoleId)) {
      return interaction.followUp({
        embeds: [
          new MessageEmbed()
            .setColor(error_color)
            .setDescription(
              `${XEmoji} This command can only be used by **Server Boosters**.`
            )
        ]
      });
    }
  }

  try {
    await commandData.execute(interaction, client);
  } catch (error) {
    console.error(error);
    await interaction.followUp({
      content:
        "<:redx:880206054007406642> Something went wrong, please try again.",
      ephemeral: true
    });
  }
}

module.exports = {
  slashCommandLoader: slashCommandLoader,
  slashCommandExecuter: slashCommandExecuter
};
