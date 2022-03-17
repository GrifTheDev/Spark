const { Message, Client, MessageEmbed } = require("discord.js");
const { colors } = require("../../../config");
const respondWithError = require("../../../utils/error/response");
const { color } = colors;

module.exports = {
  name: "help",
  desc: "Pulls up all text based commands.",
  permissionLevel: 2,

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  async execute(client, message, args) {
    //client.textCommands

    var collection = client.textCommands;
    var iterator = collection.entries();
    var allCommands = "";
    var specificCommand = args[0];

    if (!specificCommand) {
      for (var i = 0; i < collection.size; i++) {
        var command = iterator.next().value[0];

        allCommands += "`" + `${command}` + "` ";
      }

      const embed = new MessageEmbed()
        .setTitle("Spark Help Menu")
        .setColor(color)
        .setDescription(
          "Here you can find a list of all **text based commands** for staff members. Please do not share this menu to anyone outside the staff team as it is considered leaking. Want to find out more about a specific command? Type `>help [command name]`."
        )
        .addField("Commands", allCommands);

      await message.reply({
        embeds: [embed],
      });
    } else {
      var query = collection.get(specificCommand);

      if (query == undefined) {
        return await respondWithError({
          message: message,
          errorMessage:
            "The requested command (`" + specificCommand + "`) does not exist.",
        });
      } else {
        const embed = new MessageEmbed()
          .setTitle("Spark Help Menu")
          .setColor(color)
          .setDescription(
            `Here is more info on the ` + "`" + query.name + "` command."
          )
          .addField("Name", query.name)
          .addField("Description", query.desc)
          .addField("Permission Level", query.permissionLevel.toString());

        message.reply({
          embeds: [embed],
        });
      }
    }

    //var specificCommand = args.slice(0).join(" ");
  },
};
