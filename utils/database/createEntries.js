const achievementProfile = require("./schemas/achievements")
const userProfile = require("./schemas/user")
const { introductionChannelId } = require("../../config")


async function createUserProfile({ message: message }) {
    const query = await userProfile.findOne({ _id: message.author.id }).exec()

    if (query == undefined || query == null) {
        const creation = await userProfile.create({
            _id: message.author.id,
            username: message.author.username, // msg only
            messages: 0,
            unix_timestamp_of_join: "Deprecated",
            unix_timestamp_of_leave: "Deprecated",
            is_booster: false,
            hasApprovedSuggestion: false,
            hasInterested: false,
            is_staff: false
        })

        try {
            await creation.save()
        } catch (error) {
            console.log(error)
        }
    }
}

async function createAchievementProfile ({ message: message }) {
    const query = await achievementProfile.findOne({ _id: message.author.id  }).exec()

    if (query == undefined || query == null) {
        const creation = await achievementProfile.create({
            _id: message.author.id, // member id
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

        try {
            await creation.save()
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = {
    createUserProfile: createUserProfile,
    createAchievementProfile: createAchievementProfile
};
