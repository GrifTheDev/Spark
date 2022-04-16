const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, guildId } = require("../../config");
const fs = require("fs");
const logger = require("../logging/logger");


async function deployCommands(client) {
  const commands = [];

  const directories = fs.readdirSync("./commands/slash_commands");

  for (const directory of directories) {
    const filesOfDirectory = fs.readdirSync(
      `./commands/slash_commands/${directory}`
    );

    for (const file of filesOfDirectory) {
      const command = require(`../../commands/slash_commands/${directory}/${file}`);

      commands.push(command.data.toJSON());
    }
  }
  // eslint-disable-next-line no-undef
  const rest = new REST({ version: "9" }).setToken(process.env.token);

  try {
    logger.info("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands
    });

    logger.info("Successfully reloaded application (/) commands.");
  } catch (error) {
    logger.error(error);
  }

}

module.exports = {
    deployCommands: deployCommands
}
