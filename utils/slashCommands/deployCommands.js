const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { token, clientId, guildId } = require("../../config");
const fs = require("fs");

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
  const rest = new REST({ version: "9" }).setToken(token);

  try {
    console.log("[NOTICE] Deploy Slash Commands :: Started refreshing application (/) commands.");

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands
    });

    console.log("[SUCCESS] Deploy Slash Commands :: Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }

}

module.exports = {
    deployCommands: deployCommands
}
