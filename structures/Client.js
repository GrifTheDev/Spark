const { Client, Collection } = require("discord.js");
const { prefix, generalChannelId } = require("../config");
const {
  textCommandLoader,
  textCommandExecuter
} = require("../utils/textCommands/textCommand");
const {
  slashCommandLoader,
  slashCommandExecuter
} = require("../utils/slashCommands/slashCommand");
const { deployCommands } = require("../utils/slashCommands/deployCommands");
const { connectDB } = require("../utils/database/connectDB");
const ReputationManager = require("./ReputationManager");
const SelectionRoleManager = require("./SelectionRoleManager");
const AchievementManager = require("./AchievementManager");
const addMessageCount = require("../utils/addMessageCount");
const { createRepProfile, createUserProfile, createAchievementProfile } = require("../utils/database/createEntries")

class BotClient extends Client {
  constructor(options) {
    super(options);

    this.textCommands = new Collection();
    this.slashCommands = new Collection();

    this.once("ready", async () => {
      console.log("[NOTICE] Start-Up :: Logged in, starting up.");
      await connectDB(); // Must connect to database first thing.

      // Sub-Routine: Set client status
      this.user.setActivity("the All Valley tournament!", {
        type: "COMPETING"
      });

      // Sub-Routine: Load all commands into memory using maps.
      try {
        const amountOfCommands = await textCommandLoader(this);

        console.log(
          `[SUCCESS] Cache Text Commands :: Successfully loaded all text commands (${amountOfCommands}).`
        );
      } catch (error) {
        console.log(error);

        return console.log(
          "!!! [CRITICAL FAILURE] Cache Text Commands :: Could not load all text commands successfully. Full error:\n\n" +
            error
        );
      }

      try {
        const amountOfSlashCommands = await slashCommandLoader(this);

        console.log(
          `[SUCCESS] Cache Slash Commands :: Successfully loaded all slash commands (${amountOfSlashCommands}).`
        );
      } catch (error) {
        console.log(error);

        return console.log(
          "[CRITICAL FAILURE] Cache Slash Commands :: Could not load all slash commands successfully. Full error:\n\n" +
            error
        );
      }

      await deployCommands(this);

      console.log(
        `[SUCCESS] Start-Up :: Client successfully logged in as ${this.user.tag}.`
      );
    });

    this.on('guildScheduledEventUserAdd', async (interaction, user) => {
      // passing in user to avoid error
      await new AchievementManager({ message: interaction }).seeYouThere(user.id)

    })

    this.on("messageCreate", async (message) => {

      if (message.author.bot || !message.guild) return;
      await addMessageCount(message);
      await createRepProfile(message)
      await createAchievementProfile(message)

      new AchievementManager({ message: message }).helloWorld();
      new AchievementManager({ message: message }).formalities()      

      new ReputationManager({ message: message }).givePoints();

      if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(prefix)
      )
        return;

      const args = message.content.slice(prefix.length).split(/ +/);
      const textCommandName = args.shift().toLowerCase();
      const textCommandEx =
        this.textCommands.get(textCommandName) ||
        this.textCommands.find(
          (a) => a.aliases && a.aliases.includes(textCommandName)
        );
      if (!textCommandEx) return;

      textCommandExecuter(textCommandEx, this, message, args);
    });

    this.on("interactionCreate", async (interaction) => {
      if (interaction.isButton()) {
        await interaction.deferReply({
          ephemeral: true
        });

        if (interaction.customId == "pronoun_button") {
          new SelectionRoleManager({
            button: interaction
          }).sendPronounMenu();
        }

        if (interaction.customId == "ping_button") {
          new SelectionRoleManager({
            button: interaction
          }).sendPingMenu(); 
        }

        if (interaction.customId == "select_eduLevel") {
          new SelectionRoleManager({
            button: interaction
          }).sendEducationLevelMenu();
        }
      }

      
 
      if (interaction.isSelectMenu()) {
        if (interaction.customId.includes("achievement_menu_")) return
        
        await interaction.deferReply({
          ephemeral: true
        });

        if (interaction.customId == "choose_pronouns") {
          new SelectionRoleManager({
            menu: interaction
          }).asignPronouns();
        }

        if (interaction.customId == "choose_pings") {
          new SelectionRoleManager({
            menu: interaction
          }).asignPings();
        }

        if (interaction.customId == "choose_edu_lvl") {
          new SelectionRoleManager({
            menu: interaction
          }).asignEduLvl();
        }
      }

      if (!interaction.isCommand()) return;

      const command = this.slashCommands.get(interaction.commandName);
      if (!command) return;


      slashCommandExecuter(command, this, interaction);
    });

    this.on('guildMemberAdd', async (member) => {

      // createRepProfile, createUserProfile, createAchievementProfile
      await createUserProfile({ user: member }) 
      await createAchievementProfile({ user: member })
      await createRepProfile({ user: member })

      const channelToSendIn = member.guild.channels.cache.get(generalChannelId)

      await channelToSendIn.send({
        content: `:wave: Welcome to the server <@${member.id}>! We hope you have an amazing stay!`
      })
    })
  }
}

module.exports = BotClient;
