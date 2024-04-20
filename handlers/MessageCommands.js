const { Collection, REST, Routes } = require("discord.js");
const { readdirSync, existsSync } = require("fs");
const { green, yellow, red } = require("chalk");
const path = require("path");

/**
 * @param {string} folderPath - Path to commands folder.
 * @param {Client} client - Discord Client.
 */

async function MessageCommand(folderPath, client) {
  if (!existsSync(folderPath))
    throw new Error(
      red(
        `{Message Command Handler} - Path provided doesn't exist.\n'${folderPath}'`
      )
    );
    
  const pathArray = folderPath.split("/");
  const commandFolders = readdirSync(folderPath);
  client.scommands = new Collection();
  client.aliases = new Collection();
  client.scommandArray = [];
  client.aliasesArray = [];

  for (const folder of commandFolders) {
    const commandFiles = readdirSync(`${folderPath}/${folder}`);
    for (const file of commandFiles) {
      const command = require(path.join(
        require.main.path,
        pathArray[pathArray.length - 1],
        folder,
        file
      ));

      if (command == {})
        throw new Error(
          red(
            `{Message Command Handler} - Command is missing data.\n'${folderPath}/${folder}/${file}'`
          )
        );

      // Cooldown handling
      if (command.data && command.data.cooldown) {
        command.cooldownDuration = parseInt(command.data.cooldown, 10);
      }

      client.scommands.set(command.name, command);
      if (command.aliases) {
        client.aliases.set(command.aliases, command);
      }

      console.log(
        green(`{Message command Handler} - "${command.name}" command registered.`)
      );
    }
  }
}

module.exports = MessageCommand;
