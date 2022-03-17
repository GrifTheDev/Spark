const { Message, Client } = require("discord.js");

module.exports = {
  name: "ping",
  desc: "Basic ping command.",
  permissionLevel: 2,

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  async execute(client, message, args) {
    var msgEditStart = Date.now();

    const msg = await message.reply({
      content: `<a:loop:919687254727884850> Retrieving Message Edit time...`,
      allowedMentions: { repliedUser: false },
    });

    var msgEditEnd = Date.now();
    var msgEditTime = msgEditEnd - msgEditStart;

    await msg.edit({
      content: `<a:loop:919687254727884850> Retrieving Client Websocket ping...`,
      allowedMentions: { repliedUser: false },
    });

    var clientPing = client.ws.ping;

    await msg.edit({
      content: `<:client_ping:919707052127948920> The websocket ping is **${clientPing} ms** and the message edit time is **${msgEditTime} ms**.`,
    });
  },
};
