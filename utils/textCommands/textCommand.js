const fs = require("fs");
const { Client, Message } = require("discord.js");
const permissionChecker = require("./permissionChecker")
const cooldownChecker = require("./cooldownChecker")
const { emojis } = require("../../config")
const { XEmoji } = emojis

async function textCommandLoader(client) {

  var amountOfCommands = 0

  const directories = fs.readdirSync("./commands/text_commands");

  for (const directory of directories) {
    const filesOfDirectory = fs.readdirSync(`./commands/text_commands/${directory}`);

    for (const file of filesOfDirectory) {
      const command = require(`../../commands/text_commands/${directory}/${file}`);

      client.textCommands.set(command.name, command);
      amountOfCommands += 1
    }
  }

  return amountOfCommands
}

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @returns
 */

async function textCommandExecuter(commandData, client, message, args) {
  

  if (commandData.permissionLevel != undefined) {

    var permissionCheckOutput = await permissionChecker(commandData, message)

    if (permissionCheckOutput == "1") {
      return
    }
  }

  if (commandData.cooldown != undefined) {
    var cooldownCheckOutput = await cooldownChecker(commandData, message)

    // Checking execution of command, if the cooldown gets triggered, we must stop the execution of the command.
    if (cooldownCheckOutput == "1") {
      return
    }
  }

  // Final command execution

  try {
    await commandData.execute(client, message, args);
  } catch (error) {
    console.log(`!!! [SUB-ROUTINE] (Text Command Handler - Execute Command) Error :: The ${commandData.name} command has sent an error response. !!!\n${error}`)
    message.reply({
      content: `${XEmoji} The **Text Command Handler Sub-Routine** has reported an error while trying to execute the command. Please try again later.`
    })
  }
  
}

// Exporting our scripts

module.exports = {
  textCommandLoader: textCommandLoader,
  textCommandExecuter: textCommandExecuter
};
