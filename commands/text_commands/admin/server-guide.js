const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Message,
  Client,
} = require("discord.js");
const respondWithError = require("../../../utils/error/response");

module.exports = {
  name: "server-guide",
  desc: "Prints out a server guide.",
  aliases: ["sg"],
  cooldown: 10,
  permissionLevel: 5,

  /**
   *
   * @param {Client} client
   * @param {Message} message
   */

  async execute(client, message) {
    /* if (message.channel.id != "887297169546162176")
      return respondWithError({
        message: message,
        errorMessage:
          "You ran the command in the wrong channel! Please run it in <#887297169546162176>.",
      }); */

    var bannerServerGuide =
      "https://cdn.discordapp.com/attachments/919899771941040189/925076821031129128/serevrg.png";

    var introMessageOne = `   
Hey :wave:, you made it! Please, make yourself comfortable, grab a cup of your favourite drink from that bar over there and don't forget a snack as well! Take your time, we'll wait :D. Ready? Okay then, welcome to **Student Zone - a community driven by students, for students.**
> While we will get into more detail in just a moment, Student Zone is a hangout for students alike. Think of it like a giant virtual tree house for students to talk about all things school, brag or complain about grades, get support and more! Please do note that our treehouse (community), **isn't for chatting about all kinds of topics.** While we do allow some off-topic talk, we don't generally talk about things that are too off-topic.
<:empty:890854439475351572>        
        `;

    var readRulesEmbed = new MessageEmbed().setColor("BLUE").setAuthor({
      name: "It is recommended that you go over the rules before reading the server guide!",
      iconURL:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.iconsdb.com%2Ficons%2Fdownload%2Fcaribbean-blue%2Finfo-2-512.png&f=1&nofb=1",
    });
    // Message sending logic

    var introMessageTwo = `
<:empty:890854439475351572> 
**<:navigation:925081024130605097> Navigation**
> You can use the buttons below to navigate the server guide. Pressing a certain button will take you directly to the section the button is named after.
        `;

    var bannerServerInformation =
      "https://cdn.discordapp.com/attachments/919899771941040189/925077555004977152/serverinfo.png";

    var serverInformation = `
**<:about:925081857954054185> About Student Zone**
> As previously said, Student Zone is a hangout for students alike, you could say its a treehouse. Our treehouse, is an open and fully inclusive community of students that can **talk to each other about school, education and other student related things!** Feel like you should flex your latest exam results? Go to <#888031892283228211>! Or, maybe you just want to rant about that one teacher? Go to <#888064796774240286>! Our treehouse truly has a place for any student.
>       
> We also like to host fun **events** every now and then. Our events can range from simple study sessions to game nights! We want to connect with everyone in our treehouse to make everybody feel welcome and at home.
<:empty:890854439475351572>
`;
    var suggestEventsEmbed = new MessageEmbed().setColor("BLUE").setAuthor({
      name:
        "Got event ideas? Be sure to submit them using our suggestion system!",
      iconURL: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.iconsdb.com%2Ficons%2Fdownload%2Fcaribbean-blue%2Finfo-2-512.png&f=1&nofb=1",
    });
    var serverInformationTwo = `
<:empty:890854439475351572> 
**<:goals:925090178853376043> Our Goal**
> Our goal is to create, **not the best**, but a comfortable and welcoming place for students to talk, participate in events and just generally have fun in. If you ever don't feel welcomed, important, and included in our community - **we are doing something wrong.** If this is the case, please reach out to us by DMing <@909164542532157510>.
        `;

    var serverSpecialitiesBanner =
      "https://cdn.discordapp.com/attachments/919686126506242050/925094184531144714/serverspecialities.png";

    var serverSpecialities = `
<:suggestions:925093902380335155> **Suggestions**
> Member feedback is very important to us. We can't improve the server if we don't know what to improve. That's where you come in! With your suggestions and ideas we can make Student Zone a better place. So, here is a quick rundown of how it works.
>        
> Firstly, you have to come up with a suggestion. You may be inspired by something that is missing in the sevrer, or maybe an original idea you just thought of. Whatever the case, please make sure your suggestions have some quality and thought put into them, as we don't accept **low effort suggestions**. It is also recommended that you **search for your suggestion before submiting it**, so that duplicate suggestions can be prevented.
> 
> Once you have your suggestion ready, you need to submit it using our suggestion system! Head on over to <#888064585561677854> and type **/suggestion create** to get started. Once you type the command, a menu should come up showing you the possible input options for that command. The only possible and required option is the suggestion itself, so go on and put your suggestion inside the *suggestion* field. Once done, all you have to do is press [Enter] a couple of times and the command will be executed! If all goes well you should see a message saying that your suggestion has been submited. Go over to <#888064625927675924> and check if your suggestion has appeared there! In the rare case it has not, DM <@909164542532157510> as soon as possible.
> 
> Now, all you have to do is wait for the community to vote on the suggestion and for the staff team to review it. The suggestion can either be approved or denied. For every approved suggestion you get **0.5 rep**, unless you have never had an approved suggestion before, in which case you will get **3.5** rep.
<:empty:890854439475351572>
`;

    var votesOnSuggestions = new MessageEmbed().setColor("BLUE").setAuthor({
      name:
        "The staff's final decision can be largely influenced by the community's votes.",
      iconURL: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.iconsdb.com%2Ficons%2Fdownload%2Fcaribbean-blue%2Finfo-2-512.png&f=1&nofb=1",
    });

    var serverSpecialitiesTwo = `
<:empty:890854439475351572>
<:reputation:925827105818820619> **Reputation**
> Bits are a way to award active members. Bits can be earned by participating in events, having approved suggestions, and chatting.
> When you chat in the server, there is a 10% chance you will get 0.5 bits. When your suggestions gets approved, you will get 1 bit, and when you participate in events, anywhere between 2.5 - 5 bits.
> At a certain point, you will be given one of three activity roles, based on the amount of bits you have. Good luck!
`;

    var serverSpecialitiesThree = `
<:empty:890854439475351572>
<:achievements:925833495098556487> **Achievements**
> Achievements are fun tasks which you can complete to earn reputation. You can check a list of all achievements by running **/achievements** in <#888064585561677854>. Once you complete an achievement, our server bot Spark, will reply to your message with an image that will confirm completion of the achievement. At that point, you will get some amount of reputation, depending on what the completed achievement grants.
<:appeals:926221055188672583> **Appealing Infractions**
> Every infraction can be appealed. Bans can be appealed on the link provided in the ban message, while all other infractions can be appealed by **DMing <@909164542532157510> and requesting to appeal your infractions.** Please note that you can only appeal infractions **two weeks** after you got them.
        `;

    var roleInfoBanner =
      "https://cdn.discordapp.com/attachments/919899771941040189/925846683844227112/rolinfo.png";

    var roleInfo = `
<:empty:890854439475351572>
<:reputation:925827105818820619> **Bit Roles** 
*These roles are gained every time you reach a certain amount of bits.*
> <@&888398515720585266>
> ➜ Can Change Nickname
> ➜ Can Attach Files in media
> ➜ Can use External Stickers
> <@&888417673124392981>
> ➜ Can Add Reactions
> ➜ Can Attach Files in all Chats
> ➜ Can Embed & Send links
> <@&888415435287060540>
> ➜ Can Use Context Menu Commands in all Chats (Usage of normal commands outside of the commands channel will be punished!)
> ➜ Can Create Threads (Abuse will lead to punishment!)
> ➜ Can become a Priority Speaker

<:staffRoles:926209328661282847> **Staff Roles** 
*These roles are obtained by passing a staff application and then working up to higher ranks.*
> <@&884801884420976720>
> ➜ These people passed the staff application and are being trained in moderating Student Zone. After a short period they can be promoted, demoted or stay helpers.
> <@&884801394450763816>
> ➜ Dedicated people have been promoted from Helper, and are now trusted with our full moderation suite and are given elevated permissions.
> <@&884802717179052062>
> ➜ Amazing people that have shown a lot of dedication while being a moderator. Managers help manage the staff team and ban appeals.
> <@&884801507818635295>
> ➜ Unbelievable people that have dedicated a little too much time to the server. They help to manage everything.
<:empty:890854439475351572>
`;

    var roleInfoTwo = `
<a:boost_only:919896025190252585> **Special Roles**
*Special roles given in special times.*
    
> <@&891057800703258644>
> ➜ People who the **lead team** personally know, or people who deserve to be rewarded for their contribution to Student Zone.
>    ➜ Can **Create Server Invites & Attach Files in __all__ Chats**
> <@&899997722600415243>
> ➜ People who have very generously boosted the server. Thank you <3!
>    ➜ Have **every single text chat permission** & **special commands**.
> <@&909465892176424981>
> ➜ People who have joined the server and claimed this role in the first **24 hours** the server was public.
    `;

    var finalWordsBanner =
      "https://cdn.discordapp.com/attachments/919686126506242050/926221990375882762/finalWords.png";

    var finalWords = `
> Thank you for reading the server guide! We hope you are now more informed about the server. Have any suggestions for this guide? DM <@909164542532157510> and tell us what to improve.
> 
> We would also like to thank <@400529619523993602> for providing us with not only the privately hosted instance of Zeppelin (<@877267138090500097>), but also Dragory's ModMail bot (<@909164542532157510>). Without all of this the server wouldn't be able to function as good as it does now. Seriously, the biggest thank you can't sum up my gratitude toward everything you provided us with.
> 
> But, let's not forget to thank <@721330339045310505>, who not only QCed the server before launch, but also helped set up the entirety of our logging features. The quality of the server just wouldn't be the same if it were not for you. Again, the biggest thank you can't sum up my gratitude towards you.`;

    await message.channel.send({ content: bannerServerGuide });
    var introMessageSent = await message.channel.send({
      content: introMessageOne,
      embeds: [readRulesEmbed],
    });
    var introSentSecond = await message.channel.send({
      content: introMessageTwo,
    });
    await message.channel.send({ content: bannerServerInformation });
    var serverInformationSent = await message.channel.send({
      content: serverInformation,
    });
    await message.channel.send({ embeds: [suggestEventsEmbed] });
    await message.channel.send({ content: serverInformationTwo });
    await message.channel.send({ content: serverSpecialitiesBanner });
    var serverSpecialitiesSent = await message.channel.send({
      content: serverSpecialities,
    });
    await message.channel.send({ embeds: [votesOnSuggestions] });
    await message.channel.send({ content: serverSpecialitiesTwo });
    await message.channel.send({ content: serverSpecialitiesThree });
    await message.channel.send({ content: roleInfoBanner });
    var roleInfoSent = await message.channel.send({
      content: roleInfo,
      allowedMentions: { roles: false },
    });
    await message.channel.send({
      content: roleInfoTwo,
      allowedMentions: { roles: false },
    });

    await message.channel.send({ content: finalWordsBanner });
    var sentFinalWords = await message.channel.send({
      content: finalWords,
      allowedMentions: { users: false },
    });

    var goToServerInfo = new MessageButton()
      .setLabel("Go To Server Info")
      .setStyle("LINK")
      .setURL(serverInformationSent.url);

    var goToServerSpecialities = new MessageButton()
      .setLabel("Go To Server Specialities")
      .setStyle("LINK")
      .setURL(serverSpecialitiesSent.url);

    var goToRoleInfo = new MessageButton()
      .setLabel("Go To Role Info")
      .setStyle("LINK")
      .setURL(roleInfoSent.url);

    var goToFinalWords = new MessageButton()
      .setLabel("Go To Final Words")
      .setStyle("LINK")
      .setURL(sentFinalWords.url);

    var rowOfGOTOS = new MessageActionRow().addComponents(
      goToServerInfo,
      goToServerSpecialities,
      goToRoleInfo,
      goToFinalWords
    );

    var goToTop = new MessageButton()
      .setLabel("Go To The Top")
      .setStyle("LINK")
      .setURL(introMessageSent.url);

    var finalRow = new MessageActionRow().addComponents(goToTop);

    await introSentSecond.edit({
      content: introMessageTwo,
      components: [rowOfGOTOS],
    });

    await sentFinalWords.edit({
      content: finalWords,
      components: [finalRow],
    });
  },
};
