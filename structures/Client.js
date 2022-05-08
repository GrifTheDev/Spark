const {
  Client,
  Collection,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require("discord.js");
const { prefix, generalChannelId, colors, roles } = require("../config");
const { error_color } = colors;
const { memberRole } = roles;
const {
  textCommandLoader,
  textCommandExecuter,
} = require("../utils/textCommands/textCommand");
const {
  slashCommandLoader,
  slashCommandExecuter,
} = require("../utils/slashCommands/slashCommand");
const { deployCommands } = require("../utils/slashCommands/deployCommands");
const { connectDB } = require("../utils/database/connectDB");
const SelectionRoleManager = require("./SelectionRoleManager");
const AchievementManager = require("./AchievementManager");
const addMessageCount = require("../utils/addMessageCount");
const {
  createAchievementProfile,
} = require("../utils/database/createEntries");
const logger = require("../utils/logging/logger");
const BitManager = require("./BitManager");

class BotClient extends Client {
  constructor(options) {
    super(options);

    this.textCommands = new Collection();
    this.slashCommands = new Collection();

    this.once("ready", async () => {
      logger.info("Logged in, starting up.");
      await connectDB(); // Must connect to database first thing.

      // Sub-Routine: Set client status
      this.user.setActivity("the All Valley tournament!", {
        type: "COMPETING",
      });

      // Sub-Routine: Load all commands into memory using maps.
      try {
        const amountOfCommands = await textCommandLoader(this);

        logger.info(
          `Successfully loaded all text commands (${amountOfCommands}).`
        );
      } catch (error) {

        return logger.error(
          "Could not load all text commands successfully. Full error:\n\n" +
            error
        );
      }

      try {
        const amountOfSlashCommands = await slashCommandLoader(this);

        logger.info(
          `Successfully loaded all slash commands (${amountOfSlashCommands}).`
        );
      } catch (error) {

        return logger.error(
          "Could not load all slash commands successfully. Full error:\n\n" +
            error
        );
      }

      await deployCommands(this);

      logger.info(
        `Client successfully logged in as ${this.user.tag}.`
      );
    });

    this.on("guildScheduledEventUserAdd", async (interaction, user) => {
      // passing in user to avoid error
      await new AchievementManager({ message: interaction }).seeYouThere(
        user.id
      );
    });

    this.on("messageCreate", async (message) => {
      if (message.author.bot || !message.guild) return;
      await addMessageCount(message);
      await createAchievementProfile({ message: message });

      await new BitManager().addMessageBits({ member: message.member })

      

      new AchievementManager({ message: message }).helloWorld();
      new AchievementManager({ message: message }).formalities();


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

        if (interaction.customId == "verify_button") {
          await interaction.deferReply({
            ephemeral: true,
          });

          await interaction.followUp({
            embeds: [
              new MessageEmbed()
                .setColor("YELLOW")
                .setDescription(
                  "Once you verify, you will lose access to the <#957942920902766633> channel. Please ensure you have read that channel before verifying."
                )
                .setTitle("Heads Up!"),
            ],
            components: [
              new MessageActionRow().addComponents(
                new MessageButton()
                  .setStyle("PRIMARY")
                  .setLabel("Finish Verification")
                  .setCustomId("finish_verification_button")
              ),
            ],
          });
        }

        if (interaction.customId == "easter_egg") {
          await interaction.deferReply({
            ephemeral: true
          })

          if (!interaction.member.roles.cache.has("965167441879662622")) {
          await interaction.member.roles.add("965167441879662622")

          await interaction.followUp({
            content: "You have been given the <@&965167441879662622> role."
          })
        } else {
          await interaction.followUp({
            content: "You already have the <@&965167441879662622> role."
          })
        }
        }

        if (interaction.customId == "finish_verification_button") {
          await interaction.deferReply({
            ephemeral: true,
          });

          await interaction.member.roles.add(memberRole);

          await interaction.followUp({
            content: "You have been verified! Enjoy chatting in the server.",
          });
        }

        if (interaction.customId == "pronoun_button") {
          await interaction.deferReply({
            ephemeral: true,
          });

          new SelectionRoleManager({
            button: interaction,
          }).sendPronounMenu();
        }

        if (interaction.customId == "ping_button") {
          await interaction.deferReply({
            ephemeral: true,
          });

          new SelectionRoleManager({
            button: interaction,
          }).sendPingMenu();
        }

        if (interaction.customId == "select_eduLevel") {
          await interaction.deferReply({
            ephemeral: true,
          });

          new SelectionRoleManager({
            button: interaction,
          }).sendEducationLevelMenu();
        }
      } else if (interaction.isSelectMenu()) {
        if (interaction.customId.includes("achievement_menu_")) return;

        await interaction.deferReply({
          ephemeral: true,
        });

        if (interaction.customId == "choose_pronouns") {
          new SelectionRoleManager({
            menu: interaction,
          }).asignPronouns();
        }

        if (interaction.customId == "choose_pings") {
          new SelectionRoleManager({
            menu: interaction,
          }).asignPings();
        }

        if (interaction.customId == "choose_edu_lvl") {
          new SelectionRoleManager({
            menu: interaction,
          }).asignEduLvl();
        }
      } else if (interaction.isCommand()) {
        const command = this.slashCommands.get(interaction.commandName);
        if (!command) return;

        slashCommandExecuter(command, this, interaction);
      } else {
        return;
      }
    });

    this.on("guildMemberAdd", async (member) => {
      const channelToSendIn = member.guild.channels.cache.get(generalChannelId);

      await channelToSendIn.send({
        content: `:wave: Welcome to the server <@${member.id}>! We hope you have an amazing stay!`,
      });

      
    });
  }
}

module.exports = BotClient;
