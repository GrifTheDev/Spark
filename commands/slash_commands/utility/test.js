const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, CommandInteraction } = require("discord.js");
const achievementProfile = require("../../../utils/database/schemas/achievements");
const { introductionChannelId } = require("../../../config");
const userProfile = require("../../../utils/database/schemas/user")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("test command.")
    .addBooleanOption((option) =>
      option.setName("hidden").setDescription("Make the reply hidden.")
    ),
  cooldown: 10,

  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */

  async execute(interaction, client) {
    await interaction.followUp({
      content: "hi"
    });

   /*  const query1 = await userProfile.create({
      _id: interaction.user.id,
      username: interaction.user.username,
      messages: 0,
      unix_timestamp_of_join: "N/A",
      unix_timestamp_of_leave: "N/A",
      is_booster: true,
      hasApprovedSuggestion: false,
      hasInterested: false,
      is_staff: true
  }); 

  query1.save() */
    
    
     const query = await achievementProfile.create({
      _id: interaction.user.id, // member id
      lockedAchievements: [
        { 
          type: 1, 
          id: 0, 
          hidden: false 
        },
        { 
          type: 2, 
          id: 1, 
          hidden: false 
        },
        { 
          type: 2, 
          id: 2, 
          hidden: false 
        },
        {
          type: 1,
          id: 3,
          hidden: false
        },
        {
          type: 3,
          id: 4,
          hidden: false
        },
        {
          type: 2,
          id: 5,
          hidden: true
        },
        {
          type: 4,
          id: 6,
          hidden: false
        }
      ],
      unlockedAchievemens: [],
      allAchievements: [
        {
          name: "Hello World",
          desc: "Send your first message in the server."
        },
        {
          name: "Formalities",
          desc: `Introduce yourself in <#${introductionChannelId}>.`
        },
        {
          name: "Turning the Gears",
          desc: "Submit a suggestion and have it be approved."
        }, 
        {
          name: "See You There",
          desc: "Mark as `Interested` for a server event on the events tab!"
        }, 
        {
          name: "I've got stories",
          desc: "Tell some great school stories." // manual grant
        },
        {
          name: "Vibes Y'all",
          desc: "Give some great vibes in the server and be a good sport." // manual grant
        },
        {
          name: "Overachiever - [UNOBTAINABLE]",
          desc: "Earn all the achievements." // manual grant
        }
      ]
    }); 

    await query.save();
  }
};
