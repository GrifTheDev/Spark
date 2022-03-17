// eslint-disable-next-line no-unused-vars
const { Client, MessageEmbed, Message } = require("discord.js");
const { logChannelId } = require("../config");
const { emojis } = require("../config");
const { alertEmoji } = emojis;
/**
 *
 * @param {Client} client
 * @param {Message} message
 */

async function sendLog(
  { title: title, action: action, change: change, color: color },
  client,
  message
) {
  const logChannel = client.channels.cache.get(logChannelId);

  const logEmbed = new MessageEmbed()
    .setTitle(title)
    .addField("Actioned By", `<@${message.author.id}>`)
    .addField("Action", action)
    .addField("Changed", change)
    .setAuthor({
      name: message.author.tag,
      iconURL: message.author.displayAvatarURL({ dynamic: true })
    })
    .setColor(color)
    .setTimestamp();

  var log = await logChannel.send({
    embeds: [logEmbed]
  });

  return log
}

async function sendErrorLog(
  { command: command, error: error },
  message,
  client
) {
  const logChannel = client.channels.cache.get(logChannelId);

  const errorEmbed = new MessageEmbed()
    .setTitle(`${alertEmoji} ${command} Error`)
    .setAuthor({
      name: message.author.tag,
      iconURL: message.author.displayAvatarURL({ dynamic: true })
    })
    .addField("📥 Input", "```" + message.content + "```")
    .addField("📤 Client Response", "```" + error + "```")
    .setColor("RED");

  var log = await logChannel.send({
    embeds: [errorEmbed]
  });

  return log
}

module.exports = {
  sendLog: sendLog,
  sendErrorLog: sendErrorLog
};
