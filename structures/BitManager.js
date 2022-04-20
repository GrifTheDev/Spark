const bitsProfile = require("../utils/database/schemas/bits");
const logger = require("../utils/logging/logger");
const { roles } = require("../config")
const { bitRoles } = roles
const { active, chatty, regular } = bitRoles

class BitManager {
  constructor() {
    this.globalMultiplier = 1.5; // Easter event
    this.baseBits = 0.5;
    this.percentageToGetBit = 10;
  }

  // Execute on member join.
  async createBitEntry({ member: member }) {
    var creation = await bitsProfile.create({
      _id: member.id,
      bits: 0,
      multiplier: 1,
      punishmentQuota: 0,
      log: [],
    });

    try {
      await creation.save();
    } catch (error) {
      logger.error(error);
    }
  }

  async addMessageBits({ member: member }) {
    var number = Math.round(Math.random() * 100);

    if (number <= this.percentageToGetBit) {
      var query = await bitsProfile.findOne({ _id: member.id }).exec();

      if (query == undefined || query == null) {
        await this.createBitEntry({ member: member });
        query = await bitsProfile.findOne({ _id: member.id }).exec();
      }

      var newBits = query.bits + (this.baseBits * query.multiplier * this.globalMultiplier);
      query.bits = newBits;

      await query.log.push({
        action: "Bit Gain",
        changed: this.baseBits * query.multiplier * this.globalMultiplier,
        timestamp: Math.trunc(Date.now() / 1000)
      })

      try {
        await query.save();
      } catch (error) {
        logger.error(error);
      }
      await this.checkIfLogsOverpopulated({ member: member });
    
      await this.giveRoles({ member: member, bits: newBits })
    }
  }

  async addBits({member: member, toAdd: toAdd}) {
    var query = await bitsProfile.findOne({ _id: member.id }).exec();

    if (query == undefined || query == null) {
      await this.createBitEntry({ member: member });
      query = await bitsProfile.findOne({ _id: member.id }).exec();
    }

    var newBits = query.bits + (toAdd * query.multiplier * this.globalMultiplier);
    query.bits = newBits;

    await query.log.push({
      action: "Bit Gain",
      changed: toAdd,
      timestamp: Math.trunc(Date.now() / 1000)
    })

    try {
      await query.save();
    } catch (error) {
      logger.error(error);
    }
    await this.checkIfLogsOverpopulated({ member: member });
  }

  async giveRoles({ member: member, bits: bits}) {

    await this.removeAllRoles({ member: member })

    if (bits >= 5 && bits < 15 && !member.roles.cache.has(active)) await member.roles.add(chatty)
    if (bits >= 15 && bits < 30 && !member.roles.cache.has(chatty)) await member.roles.add(active)
    if (bits >= 30 && !member.roles.cache.has(regular)) await member.roles.add(regular)
  
  }

  async removeAllRoles({ member: member }) {
    await member.roles.remove(chatty)
    await member.roles.remove(active)
    await member.roles.remove(regular)
  }

  async checkIfLogsOverpopulated({ member: member }) {
    var query = await bitsProfile.findOne({ _id: member.id }).exec();

    if (query == undefined || query == null) {
      await this.createBitEntry({ member: member });
      query = await bitsProfile.findOne({ _id: member.id }).exec();
    }

    if (query.log.length > 5) {
      query.log.shift();
      await query.save();
    }
  }
}

module.exports = BitManager;
