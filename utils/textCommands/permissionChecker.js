const { emojis, timeToDeleteMessages } = require("../../config");

async function permissionChecker(commandData, message) {
  const permissionLevel = commandData.permissionLevel;

  if (isNaN(permissionLevel))
    return console.log(
      `!!! {Error} [SUB-ROUTINE] (CommandExecuter - Permission Check) :: Permission level provided is not a number. Failed to execute the ${commandData.name} command.`
    );

  switch (permissionLevel) {
    case 1:
      if (!message.member.roles.cache.has("899997722600415243")) {
        message
          .reply({
            content: `${emojis.boostEmoji} This command is exclusive to **Server Boosters**!`
          })
          .then((sentMsg) => {
            setTimeout(() => {
              if (sentMsg.deletable == true) sentMsg.delete();
            }, timeToDeleteMessages);
          });
        return "1";
      }

      break;

    case 2:
      if (!message.member.permissions.has("MANAGE_MESSAGES")) {
        message
          .reply({
            content: `${emojis.XEmoji} Insufficient permissions! Only **Helpers (Permission Level 2)** and above can run this command.`
          })
          .then((sentMsg) => {
            setTimeout(() => {
              if (sentMsg.deletable == true) sentMsg.delete();
            }, timeToDeleteMessages);
          });
        return "1";
      }
      break;
    case 3:
      if (!message.member.permissions.has("MANAGE_ROLES")) {
        message
          .reply({
            content: `${emojis.XEmoji} Insufficient permissions! Only **Hall Monitors (Permission Level 3)** and above can run this command.`
          })
          .then((sentMsg) => {
            setTimeout(() => {
              if (sentMsg.deletable == true) sentMsg.delete();
            }, timeToDeleteMessages);
          });
        return "1";
      }
      break;
    case 4:
      if (!message.member.permissions.has("MANAGE_EVENTS")) {
        message
          .reply({
            content: `${emojis.XEmoji} Insufficient permissions! Only **Managers (Permission Level 4)** and above can run this command.`
          })
          .then((sentMsg) => {
            setTimeout(() => {
              if (sentMsg.deletable == true) sentMsg.delete();
            }, timeToDeleteMessages);
          });

        return "1";
      }
      break;
    case 5:
      if (!message.member.permissions.has("ADMINISTRATOR")) {
        message
          .reply({
            content: `${emojis.XEmoji} Insufficient permissions! Only **Admins (Permission Level 5)** and above can run this command.`
          })
          .then((sentMsg) => {
            setTimeout(() => {
              if (sentMsg.deletable == true) sentMsg.delete();
            }, timeToDeleteMessages);
          });
        return "1";
      }
      break;
    case 6:
      if (!message.member.roles.cache.has("919687727774052403")) {
        message
          .reply({
            content: `${emojis.XEmoji} Insufficient permissions! Only **Owners (Permission Level 6)** can run this command.`
          })
          .then((sentMsg) => {
            setTimeout(() => {
              if (sentMsg.deletable == true) sentMsg.delete();
            }, timeToDeleteMessages);
          });
        return "1";
      }
      break;
  }
}

module.exports = permissionChecker;
