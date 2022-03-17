const { Message, Client, MessageEmbed } = require("discord.js");
const achievementProfile = require("../../../utils/database/schemas/achievements");
const AchievementManager = require("../../../structures/AchievementManager");
const userProfile = require("../../../utils/database/schemas/user")

module.exports = {
  name: "test",
  desc: "A test command.",
  permissionLevel: 6,

  /**
   *
   * @param {Client} client
   * @param {Message} message
   */

  async execute(client, message) {
    
  }
};

