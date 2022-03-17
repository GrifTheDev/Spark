const { MessageSelectMenu, MessageActionRow } = require("discord.js");
const { roles, emojis } = require("../config");
const { pronounRoles, pingRoles, educationLevel } = roles;
const { tickEmoji } = emojis;
const { hehim, sheher, theythem, neo, any, ask, hethey, shethey } = pronounRoles
const { announcements, giveaways, stages, events } = pingRoles
const { preHighSchool, highSchool, college } = educationLevel

class SelectionRoleManager {
  constructor({ button: button, menu: menu }) {
    if (button != undefined) this.button = button;
    if (menu != undefined) this.menu = menu;
  }

  async sendPronounMenu() {
    const select = new MessageSelectMenu()
      .setCustomId("choose_pronouns")
      .setMinValues(0)
      .setMaxValues(6)
      .setOptions(
        {
          label: "He/Him",
          emoji: "939674169430409236",
          value: "hehim",
          default: this.button.member.roles.cache.has(hehim),
        },
        {
          label: "She/Her",
          emoji: "939674772332232714",
          value: "sheher",
          default: this.button.member.roles.cache.has(sheher),
        },
        {
          label: "They/Them",
          emoji: "939675352375132181",
          value: "theythem",
          default: this.button.member.roles.cache.has(theythem),
        },
        {
          label: "He/They",
          emoji: "940253342574182450",
          value: "hethey",
          default: this.button.member.roles.cache.has(hethey),
        },
        {
          label: "She/They",
          emoji: "940254292227538986",
          value: "shethey",
          default: this.button.member.roles.cache.has(shethey),
        },
        {
          label: "Neopronouns",
          emoji: "939676619600175126",
          value: "neo",
          default: this.button.member.roles.cache.has(neo),
        },
        {
          label: "Ask for Pronouns",
          emoji: "940980983451246673",
          value: "ask",
          default: this.button.member.roles.cache.has(ask),
        },
        {
          label: "Any",
          emoji: "939677629735370762",
          value: "any",
          default: this.button.member.roles.cache.has(any),
        }
      )
      .setPlaceholder("Choose your Pronouns");

    const row = new MessageActionRow().addComponents(select);

    this.button.followUp({
      content: "Pronoun Menu:",
      components: [row],
      ephemeral: true,
    });
  }

  async sendPingMenu() {
    const select = new MessageSelectMenu()
      .setCustomId("choose_pings")
      .setMinValues(0)
      .setMaxValues(4)
      .setOptions(
        {
          label: "Announcements",
          emoji: "829394738879791104",
          value: "announce",
          description: "Updates, small news and more!",
          default: this.button.member.roles.cache.has(announcements),
        },
        {
          label: "Giveaways",
          emoji: "🎉",
          value: "giveaways",
          description: "Hear ye, hear ye - giving away free stuff!",
          default: this.button.member.roles.cache.has(giveaways),
        },
        {
          label: "Stages",
          emoji: "825309164569231361",
          description: "Panels, talks, AMAs and all things stages!",
          value: "stages",
          default: this.button.member.roles.cache.has(stages),
        },
        {
          label: "Events",
          emoji: "915560566641262642",
          description: "Hosting events!1!!11!",
          value: "events",
          default: this.button.member.roles.cache.has(events),
        }
      )
      .setPlaceholder("Choose your Pings");

    const row = new MessageActionRow().addComponents(select);

    this.button.followUp({
      content: "Ping Menu:",
      components: [row],
      ephemeral: true,
    });
  }

  async sendEducationLevelMenu() {
    const select = new MessageSelectMenu()
      .setCustomId("choose_edu_lvl")
      .setMinValues(0)
      .setMaxValues(1)
      .setOptions(
        {
          label: "Pre-High School",
          emoji: "🎒",
          value: "preHighSchool",
          default: this.button.member.roles.cache.has(preHighSchool),
        },
        {
          label: "High School",
          emoji: "🏫",
          value: "highSchool",
          default: this.button.member.roles.cache.has(highSchool),
        },
        {
          label: "College",
          emoji: "📔",
          value: "college",
          default: this.button.member.roles.cache.has(college),
        },
      )
      .setPlaceholder("Choose your Education Level");

    const row = new MessageActionRow().addComponents(select);

    this.button.followUp({
      content: "Education Level Menu:",
      components: [row],
      ephemeral: true,
    });
  }

  async asignPronouns() {

    switch (this.menu.values.includes("hehim")) {
      case true:
        await this.menu.member.roles.add(hehim);
        break;
      case false:
        await this.menu.member.roles.remove(hehim);
        break;
    }

    switch (this.menu.values.includes("sheher")) {
      case true:
        await this.menu.member.roles.add(sheher);
        break;
      case false:
        await this.menu.member.roles.remove(sheher);
        break;
    }

    switch (this.menu.values.includes("theythem")) {
      case true:
        await this.menu.member.roles.add(theythem);
        break;
      case false:
        await this.menu.member.roles.remove(theythem);
        break;
    }

    switch (this.menu.values.includes("hethey")) {
      case true:
        await this.menu.member.roles.add(hethey);
        break;
      case false:
        await this.menu.member.roles.remove(hethey);
        break;
    }

    switch (this.menu.values.includes("shethey")) {
      case true:
        await this.menu.member.roles.add(shethey);
        break;
      case false:
        await this.menu.member.roles.remove(shethey);
        break;
    }

    switch (this.menu.values.includes("neo")) {
      case true:
        await this.menu.member.roles.add(neo);
        break;
      case false:
        await this.menu.member.roles.remove(neo);
        break;
    }

    switch (this.menu.values.includes("ask")) {
      case true:
        await this.menu.member.roles.add(ask);
        break;
      case false:
        await this.menu.member.roles.remove(ask);
        break;
    }

    switch (this.menu.values.includes("any")) {
      case true:
        await this.menu.member.roles.add(any);
        break;
      case false:
        await this.menu.member.roles.remove(any);
        break;
    }

    await this.menu.followUp({
      content: `${tickEmoji} Your roles have been successfullly updated!`,
    });
  }

  async asignPings() {

    switch (this.menu.values.includes("announce")) {
      case true:
        await this.menu.member.roles.add(announcements);
        break;
      case false:
        await this.menu.member.roles.remove(announcements);
        break;
    }

    switch (this.menu.values.includes("giveaways")) {
      case true:
        await this.menu.member.roles.add(giveaways);
        break;
      case false:
        await this.menu.member.roles.remove(giveaways);
        break;
    }

    switch (this.menu.values.includes("stages")) {
      case true:
        await this.menu.member.roles.add(stages);
        break;
      case false:
        await this.menu.member.roles.remove(stages);
        break;
    }

    switch (this.menu.values.includes("events")) {
      case true:
        await this.menu.member.roles.add(events);
        break;
      case false:
        await this.menu.member.roles.remove(events);
        break;
    }

    await this.menu.followUp({
      content: `${tickEmoji} Your roles have been successfullly updated!`,
    });
  }

  async asignEduLvl() {

    switch (this.menu.values.includes("preHighSchool")) {
      case true:
        await this.menu.member.roles.add(preHighSchool);
        break;
      case false:
        await this.menu.member.roles.remove(preHighSchool);
        break;
    }

    switch (this.menu.values.includes("highSchool")) {
      case true:
        await this.menu.member.roles.add(highSchool);
        break;
      case false:
        await this.menu.member.roles.remove(highSchool);
        break;
    }

    switch (this.menu.values.includes("college")) {
      case true:
        await this.menu.member.roles.add(college);
        break;
      case false:
        await this.menu.member.roles.remove(college);
        break;
    }

    await this.menu.followUp({
      content: `${tickEmoji} Your roles have been successfullly updated!`,
    });
  }
}

module.exports = SelectionRoleManager;
