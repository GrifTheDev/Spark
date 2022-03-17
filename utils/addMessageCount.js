const profile = require("../utils/database/schemas/user");
const { introductionChannelId } = require("../config");
const { createUserProfile } = require("./database/createEntries");

async function addMessageCount(message) {
  const query = await profile.findOne({ _id: message.author.id }).exec();
  if (query == undefined || query == null) {
    await createUserProfile({ message: message });

    return;
  } else if (message.channel.id != introductionChannelId) {
    const update = await profile.findOneAndUpdate(
      {
        _id: message.author.id,
      },
      {
        $inc: {
          messages: 1,
        },
      }
    );

    update.save();
  }
}

module.exports = addMessageCount;
