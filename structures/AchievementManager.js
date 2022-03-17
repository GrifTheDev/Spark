const { MessageEmbed } = require("discord.js");
const memberProfile = require("../utils/database/schemas/user");
const {
  colors,
  introductionChannelId,
  notificationChannelId,
  emojis
} = require("../config");
const { achievement_gain_color } = colors;
const achievementProfile = require("../utils/database/schemas/achievements");
const reputationProfile = require("../utils/database/schemas/reputation");
const respondWithError = require("../utils/error/response");
const { tickEmoji, XEmoji } = emojis;

class AchievementManager {
  constructor({ message: message }) {
    if (message != undefined) this.message = message;

    this.achievementName = "N/A";
    this.totalAchievements = 0;
    this.unlockedAchievements = 0;
  }

  async sendEmbedReply() {
    this.embed = new MessageEmbed()
      .setColor(achievement_gain_color)
      .setAuthor({
        iconURL:
          "https://cdn.discordapp.com/attachments/919686126506242050/946357600323272744/achievement.png",
        name: "Achievement Unlocked!"
      })
      .setDescription(
        `You have unlocked the **${this.achievementName}** achievement, congratulations!\n You now have **${this.unlockedAchievements}/${this.totalAchievements} achievements.**`
      );

    await this.message.reply({
      embeds: [this.embed],
      allowedMentions: {
        repliedUser: true
      }
    });
  }

  async sendEmbedChannel(memberId) {
    this.embed = new MessageEmbed()
      .setColor(achievement_gain_color)
      .setAuthor({
        iconURL:
          "https://cdn.discordapp.com/attachments/919686126506242050/946357600323272744/achievement.png",
        name: "Achievement Unlocked!"
      })
      .setDescription(
        `You have unlocked the **${this.achievementName}** achievement, congratulations!\n You now have **${this.unlockedAchievements}/${this.totalAchievements} achievements.**`
      );

    var sendChannel = this.message.guild.channels.cache.get(
      notificationChannelId
    );

    await sendChannel.send({
      embeds: [this.embed],
      content: `<@${memberId}>`
    });
  }

  async updateDatabaseAndSetVariables(
    { type: type, id: id, hidden: hidden },
    memberId
  ) {
    const profile = await this.checkAchievementProfile(memberId);

    this.achievementName = await profile.allAchievements[id].name;

    var addToUnlocked = await achievementProfile.findOneAndUpdate(
      {
        _id: memberId
      },
      {
        $push: {
          unlockedAchievements: { type: type, id: id, hidden: hidden }
        }
      }
    );

    try {
      await addToUnlocked.save();
    } catch (error) {
      console.log(error);
    }

    var removeFromLocked = await achievementProfile.findOneAndUpdate(
      {
        _id: memberId
      },
      {
        $pull: {
          lockedAchievements: { type: type, id: id, hidden: hidden }
        }
      }
    );

    try {
      await removeFromLocked.save();
    } catch (error) {
      console.log(error);
    }
  }

  // Achievement function of the class
  async helloWorld() {
    const query = await this.checkMemberProfile(this.message.author.id);

    if (
      query.messages == 1 &&
      this.message.channel.id != introductionChannelId
    ) {
      await this.updateDatabaseAndSetVariables(
        {
          type: 1,
          id: 0,
          hidden: false
        },
        this.message.author.id
      );

      await this.sendEmbedReply();
    }
  }

  async formalities() {
    if (
      this.message.channel.id == introductionChannelId &&
      this.message.content.length > 100
    ) {
      await this.updateDatabaseAndSetVariables(
        {
          type: 2,
          id: 1,
          hidden: false
        },
        this.message.author.id
      );
      await this.sendEmbedChannel(this.message.author.id);
    }
  }

  async turningTheGears(memberId) {
    await this.updateDatabaseAndSetVariables(
      {
        type: 2,
        id: 2,
        hidden: false
      },
      memberId
    );

    await this.sendEmbedChannel(memberId);
  }

  async seeYouThere(memberId) {
    const profile = await this.checkMemberProfile(memberId);

    if (profile.hasInterested == false) {
      var query = await memberProfile.findOneAndUpdate(
        {
          _id: memberId
        },
        {
          hasInterested: true
        }
      );

      try {
        await query.save();
      } catch (error) {
        console.log(error);
      }

      await this.updateDatabaseAndSetVariables(
        {
          type: 1,
          id: 3,
          hidden: false
        },
        memberId
      );

      await this.sendEmbedChannel(memberId);
    }
  }

  async iveGotStories(memberId, response) {
    const alreadyUnlocked = await this.hasAchievement(
      {
        type: 3,
        id: 4,
        hidden: false
      },
      memberId
    );

    if (alreadyUnlocked == false) {
      await this.updateDatabaseAndSetVariables(
        {
          type: 3,
          id: 4,
          hidden: false
        },
        memberId
      );

      await this.sendEmbedChannel(memberId);
      response.edit({
        content: `${tickEmoji} Successfully granted achievement!`
      })

    } else {
      return response.edit({
        content: `${XEmoji} The specified member already has the specified achievement.`
      })
    }
  }

  async vibesYall(memberId, response) {
    const alreadyUnlocked = await this.hasAchievement(
      {
        type: 3,
        id: 4,
        hidden: false
      },
      memberId
    );

    if (alreadyUnlocked == false) {
      await this.updateDatabaseAndSetVariables(
        {
          type: 2,
          id: 5,
          hidden: true
        },
        memberId
      );

      await this.sendEmbedChannel(memberId);
      response.edit({
        content: `${tickEmoji} Successfully granted achievement!`
      })

    } else {
      return response.edit({
        content: `${XEmoji} The specified member already has the specified achievement.`
      })
    }
  }

  // Achievement function of the class

  async checkMemberProfile(memberId) {
    const query = await memberProfile.findOne({ _id: memberId }).exec();

    if (query == undefined || query == null) {
      throw Error(
        "[ERROR] Check HW Achievement :: Member does not have a database profile!"
      );
    } else {
      return query;
    }
  }

  async checkAchievementProfile(id) {
    const query = await achievementProfile.findOne({ _id: id }).exec();

    if (query == undefined || query == null) {
      throw new Error(
        "[ERROR] Check HW Achievement :: Member does not have a database profile!"
      );
    } else {
      this.totalAchievements = query.allAchievements.length;
      this.unlockedAchievements = query.unlockedAchievements.length + 1;

      return query;
    }
  }

  async hasAchievement(toCheck, memberId) {
    var query = await achievementProfile.findOne({ _id: memberId }).exec();
    var unlockedAchievements = query.unlockedAchievements;
    var foundMatching = false
    for (var i = 0; i < unlockedAchievements.length; i++) {
      const obj = unlockedAchievements[i];
      if (obj.id == toCheck.id) {
        foundMatching = true
        break
      }
    }
    return foundMatching
  }

  async checkReputationProfile() {
    const query = await reputationProfile
      .findOne({ _id: this.message.author.id })
      .exec();

    if (query == undefined || query == null) {
      throw new Error(
        "[ERROR] Check HW Achievement :: Member does not have a database profile!"
      );
    } else {
      return query;
    }
  }

  async returnEmbedByFilter({
    achievementTier: achievementTier,
    achievementTierWords: achievementTierWords,
    memberId: memberId
  }) {
    const profile = await this.checkAchievementProfile(memberId);
    const returnEmbed = new MessageEmbed()
      .setAuthor({
        iconURL:
          "https://cdn.discordapp.com/attachments/919686126506242050/946357600323272744/achievement.png",
        name: `${achievementTierWords} tier ahievements for ${this.message.user.tag}`
      })
      .setTimestamp();
    var unlockedArr = profile.unlockedAchievements.filter(
      (item) => item.type == achievementTier
    );
    var lockedArr = profile.lockedAchievements.filter(
      (item) => item.type == achievementTier
    );
    var allAchievements = profile.allAchievements;

    for (var i = 0; i < unlockedArr.length; i++) {
      const obj = unlockedArr[i];
      var title = allAchievements[obj.id].name;
      var description = allAchievements[obj.id].desc;
      returnEmbed.addField(
        `${tickEmoji} ` + title.toString(),
        description.toString(),
        true
      );
    }

    for (var j = 0; j < lockedArr.length; j++) {
      var obj = lockedArr[j];

      var title = allAchievements[obj.id].name;
      var description = allAchievements[obj.id].desc;
      if (obj.hidden == true) {
        title = "Hidden Achievement"
        description = "This achievement's metadata is hidden, earn it to unlock the metadata."
      }
      returnEmbed.addField(
        `${XEmoji} ` + title.toString(),
        description.toString(),
        true
      );
    }

    try {
      await this.message.editReply({
        embeds: [returnEmbed]
      }); // message here = interaction
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = AchievementManager;
