const reputationProfile = require("../utils/database/schemas/reputation");
const { roles, colors } = require("../config");
const { up_color } = colors;
// eslint-disable-next-line no-unused-vars
const { repRoles } = roles;
const { rep5, rep10, rep15, rep30, rep50, rep75, rep100 } = repRoles;
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

class ReputationManager {
  constructor({
    // eslint-disable-next-line no-unused-vars
    toGive: toGive,
    message: message,
  }) {
    if (toGive != undefined) this.toGive = toGive;

    if (message != undefined) this.message = message;

    this.repGiveOnPointMeet = 1;
  }

  async addProfileOnJoin({ memberId: memberId, username: username }) {
    let noProfile = await reputationProfile.create({
      _id: memberId,
      repAmount: 0,
      pointAmount: 1,
      pointsTowardRep: Math.round(Math.random() * 4 * 10) + 10,
      cuurentRole: "None",
      userID: memberId,
      username: username,
    });

    try {
      await noProfile.save();
    } catch (error) {
      console.log(
        `[ERROR] Create Rep Profile :: An error has been encountered while creating the rep profile.\n\n` +
          error
      );
    }
  }

  async giveRoles({ rep: rep, removed: removed }) {
    rep += 1; // accounting for the fact that the old rep gets passed in

    const upEmbed = new MessageEmbed().setColor(up_color);

    const perks = new MessageButton()
      .setLabel("Role Perks")
      .setURL(
        "https://discord.com/channels/884799738682175539/887297169546162176/926228253100888084"
      )
      .setStyle("LINK");

    if (removed == true) {
      upEmbed.setFooter({
        text: "Your reputation has been removed and you are being notified about your new role.",
      });
    }

    const row = new MessageActionRow().addComponents(perks);

    // switch doesnt work :(, at least to my understading, do message me if you can find a working implementation
    if (rep >= 5 && rep < 10 && !this.message.member.roles.cache.has(rep5)) {
      await this.message.member.roles.add(rep5);
      upEmbed.setDescription(
        `:tada: Great job **${this.message.author.username}**, you have reached **5 reputation** and have been given the <@&${rep5}> role. Keep it up!`
      );

      this.message.channel.send({
        embeds: [upEmbed],
        content: `<@${this.message.author.id}>`,
        components: [row],
      });
    } else if (
      rep >= 10 &&
      rep < 15 &&
      !this.message.member.roles.cache.has(rep10)
    ) {
      await this.removePrevious();
      await this.message.member.roles.add(rep10);
      upEmbed.setDescription(
        `:tada: Great job **${this.message.author.username}**, you have reached **10 reputation** and have been given the <@&${rep10}> role. Keep it up!`
      );

      await this.message.channel.send({
        embeds: [upEmbed],
        content: `<@${this.message.author.id}>`,
        components: [row],
      });
    } else if (
      rep >= 15 &&
      rep < 30 &&
      !this.message.member.roles.cache.has(rep15)
    ) {
      await this.removePrevious();
      await this.message.member.roles.add(rep15);
      upEmbed.setDescription(
        `:tada: Great job **${this.message.author.username}**, you have reached **15 reputation** and have been given the <@&${rep15}> role. Keep it up!`
      );

      this.message.channel.send({
        embeds: [upEmbed],
        content: `<@${this.message.author.id}>`,
        components: [row],
      });
    } else if (
      rep >= 30 &&
      rep < 50 &&
      !this.message.member.roles.cache.has(rep30)
    ) {
      await this.removePrevious();
      await this.message.member.roles.add(rep30);
      upEmbed.setDescription(
        `:tada: Great job **${this.message.author.username}**, you have reached **30 reputation** and have been given the <@&${rep30}> role. Keep it up!`
      );

      this.message.channel.send({
        embeds: [upEmbed],
        content: `<@${this.message.author.id}>`,
        components: [row],
      });
    } else if (
      rep >= 50 &&
      rep < 75 &&
      !this.message.member.roles.cache.has(rep50)
    ) {
      await this.removePrevious();
      await this.message.member.roles.add(rep50);
      upEmbed.setDescription(
        `:tada: Great job **${this.message.author.username}**, you have reached **50 reputation** and have been given the <@&${rep50}> role. Keep it up!`
      );

      this.message.channel.send({
        embeds: [upEmbed],
        content: `<@${this.message.author.id}>`,
        components: [row],
      });
    } else if (
      rep >= 75 &&
      rep < 100 &&
      !this.message.member.roles.cache.has(rep75)
    ) {
      await this.removePrevious();
      await this.message.member.roles.add(rep75);
      upEmbed.setDescription(
        `:tada: Great job **${this.message.author.username}**, you have reached **75 reputation** and have been given the <@&${rep75}> role. Keep it up!`
      );

      this.message.channel.send({
        embeds: [upEmbed],
        content: `<@${this.message.author.id}>`,
        components: [row],
      });
    } else if (rep >= 100 && !this.message.member.roles.cache.has(rep100)) {
      await this.removePrevious();
      await this.message.member.roles.add(rep100);
      upEmbed.setDescription(
        `:sparkles: Great job **${this.message.author.username}**, you have reached **100 reputation** and have been given the <@&${rep100}> role. Keep it up!`
      );

      this.message.channel.send({
        embeds: [upEmbed],
        content: `<@${this.message.author.id}>`,
        components: [row],
      });
    }
  }

  async removeRoles({ rep: rep }) {
    // Removing all roles then calling giveRoles again
    await this.message.member.roles.remove(rep5);
    await this.message.member.roles.remove(rep10);
    await this.message.member.roles.remove(rep15);
    await this.message.member.roles.remove(rep30);
    await this.message.member.roles.remove(rep50);
    await this.message.member.roles.remove(rep75);
    await this.message.member.roles.remove(rep100);

    await this.giveRoles({
      rep: rep - 1, // accounting for my accounting lmao
      removed: true,
    }); //TODO: REp
  }

  async removePrevious() {
    await this.message.member.roles.remove(rep5);
    await this.message.member.roles.remove(rep10);
    await this.message.member.roles.remove(rep15);
    await this.message.member.roles.remove(rep30);
    await this.message.member.roles.remove(rep50);
    await this.message.member.roles.remove(rep75);
    await this.message.member.roles.remove(rep100);
  }

  async givePoints() {
    let updatingPoints = await reputationProfile.findOneAndUpdate(
      {
        _id: this.message.author.id,
      },
      {
        $inc: {
          pointAmount: 1,
        },
      }
    );

    try {
      await updatingPoints.save();
    } catch (error) {
      return console.log(
        `[CRITICAL ERROR] Give Points :: ${this.message.author.username} does not have a reputation profile!`
      );
    }

    var query = await reputationProfile.findOne({
      _id: this.message.author.id,
    });

    if (query == null || query == undefined) {
      return console.log(
        `[CRITICAL ERROR] Give Points :: ${this.message.author.username} does not have a reputation profile!`
      );
    }

    if (query.pointAmount == query.pointsTowardRep) {
      this.pointsMetRequirements();
    }
  }

  async pointsMetRequirements() {
    var query = await reputationProfile.findOne({
      _id: this.message.author.id,
    });

    if (query == null || query == undefined) {
      return console.log(
        `[CRITICAL ERROR] Give Rep :: ${this.message.author.username} does not have a reputation profile!`
      );
    }

    let updatingRep = await reputationProfile.findOneAndUpdate(
      {
        _id: this.message.author.id,
      },
      {
        $inc: {
          repAmount: this.repGiveOnPointMeet,
        },
      }
    );

    try {
      await updatingRep.save();
    } catch (error) {
      return console.log(
        `[CRITICAL ERROR] Give Points :: ${this.message.author.username} does not have a reputation profile!`
      );
    }

    var updateMeetReq = await reputationProfile.findOneAndUpdate(
      {
        _id: this.message.author.id,
      },
      {
        pointsTowardRep: Math.round(Math.random() * 4 * 10) + 10,
      }
    );

    try {
      await updateMeetReq.save();
    } catch (error) {
      return console.log(
        `[CRITICAL ERROR] Scramble Point Requirement :: ${this.message.author.username} does not have a reputation profile!`
      );
    }

    var resetPoints = await reputationProfile.findOneAndUpdate(
      {
        _id: this.message.author.id,
      },
      {
        pointAmount: 0,
      }
    );

    try {
      await resetPoints.save();
    } catch (error) {
      return console.log(
        `[CRITICAL ERROR] Reset Points :: ${this.message.author.username} does not have a reputation profile!`
      );
    }

    this.giveRoles({
      rep: query.repAmount,
      removed: false,
    });
  }

  async removeRep({ toRemove: toRemove }) {
    var query = await reputationProfile.findOne({
      _id: this.message.author.id,
    });

    if (query == null || query == undefined) {
      return console.log(
        `[CRITICAL ERROR] Remove Rep :: ${this.message.author.username} does not have a reputation profile!`
      );
    }

    let updatingRep = await reputationProfile.findOneAndUpdate(
      {
        _id: this.message.author.id,
      },
      {
        repAmount: Number(query.repAmount - toRemove),
      }
    );

    try {
      await updatingRep.save();
    } catch (error) {
      return console.log(
        `[CRITICAL ERROR] Remove Rep :: ${this.message.author.username} does not have a reputation profile!`
      );
    }

    await this.removeRoles({
      rep: query.repAmount - toRemove,
    });
  }

  async giveCertainRep() {
    var query = await reputationProfile.findOne({
      _id: this.message.author.id,
    });

    if (query == null || query == undefined) {
      return console.log(
        `[CRITICAL ERROR] Remove Rep :: ${this.message.author.username} does not have a reputation profile!`
      );
    }

    let updatingRep = await reputationProfile.findOneAndUpdate(
      {
        _id: this.message.author.id,
      },
      {
        $inc: {
          repAmount: this.toGive,
        },
      }
    );

    try {
      await updatingRep.save();
    } catch (error) {
      return console.log(
        `[CRITICAL ERROR] Remove Rep :: ${this.message.author.username} does not have a reputation profile!`
      );
    }

    this.giveRoles({
      rep: query.repAmount + this.toGive,
    });
  }
}

module.exports = ReputationManager;
