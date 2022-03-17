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
    message.channel.send({
      content: "Running command..."
    });

    const query = await userProfile.create({
      _id: message.author.id,
      username: message.author.username,
      messages: 0,
      unix_timestamp_of_join: "N/A",
      unix_timestamp_of_leave: "N/A",
      is_booster: true,
      hasApprovedSuggestion: false,
      hasInterested: false,
      is_staff: true
  });

    await query.save();

    message.channel.send({
      content: "Command execution complete."
    });
  }
};

/* message.channel.send({
    content: "Running command..."
  });

  const query = await achievementProfile.create({
    _id: message.author.id, // member id
    lockedAchievements: [{ type: 1, id: 0, hidden: false  }],
    unlockedAchievemens: [],
    allAchievements: ["Hello World!"]
  });

  await query.save()

  message.channel.send({
      content: "Command execution complete."
  }) */

/*  const e = new MessageEmbed()
    .setColor("#FFD11F")
    .setAuthor({
      iconURL: "https://cdn.discordapp.com/attachments/919686126506242050/946357600323272744/achievement.png",
      name: "Achievement Unlocked!"
    })
    .setDescription("You have unlocked the **Hello World** achievement, congratulations!\n You now hvae 1/10 entry tier achievements and 1/26 achievements.")
    .setFooter({
      text: "Current Reputation: 4.5"
    })

    message.channel.send({embeds: [e], content: `<@${message.author.id}>`}) */
