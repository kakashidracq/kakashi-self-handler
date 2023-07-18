const { readdirSync, existsSync } = require("fs");
const { green, red } = require("chalk");
const path = require("path");

/**
 * @param {string} folderPath - Path to client event folder.
 * @param {Client} client -
 * @Param {Prefix} prefix - Discord Client.
 */

async function handleMessageEvents(client, message, prefix) {
    const { scommands } = client;
    const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = scommands.get(cmd);
    if (!command) return;

    try {
      await scommand.execute(message, client);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: `Something went wrong while executing this command...`,
        ephemeral: true,
      });
    }
}

module.exports = handleMessageEvents;
