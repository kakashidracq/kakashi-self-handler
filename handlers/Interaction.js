
const { BaseInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

/**
 * @param {BaseInteraction} interaction - The interaction.
 * @param {Client} client - Discord Client.
 */

async function handleInteraction(interaction, client) {
  const { commands, buttons, selectMenus, modals } = client;
  const { commandName, customId } = interaction;
  console.log(commandName)

  const cooldownKey = `${interaction.user.id}-${commandName || customId}`;
  const userCooldown = client.cooldowns.get(cooldownKey) || 0;
  if (userCooldown > Date.now()) {
    const remainingTime = (userCooldown - Date.now()) / 1000;
    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`<:error:1230860807252873306> **Cooldown:** You are on cooldown please wait ${remainingTime.toFixed(1)} seconds`)
          .setFooter({ text: `Info : The cooldown is for preventing spam usage of commands/buttons`, iconURL: 'https://images-ext-1.discordapp.net/external/cpRhajDvGdN-7vpA4v_auFKPbBX9emkfZw0F1i3MLl4/https/cdn.discordapp.com/emojis/1159095895640522822.gif' })
          .setColor('Red')
      ],
      ephemeral: true,
    });
  }
  let cooldownDuration = 0;
  let voteOnly;
  let command = null;
  if (interaction.isChatInputCommand()) {
    command = commands.get(commandName);
  } else if (interaction.isButton()) {
    command = buttons.get(customId);
  } else if (interaction.isStringSelectMenu()) {
    command = selectMenus.get(customId);
  } else if (interaction.isModalSubmit()) {
    command = modals.get(customId);
  }
  console.log(command)
  if (!command) return;
  if (interaction.isChatInputCommand()) {
    cooldownDuration = parseInt(command.cooldown, 10);
    voteOnly = command.voteonly || false
  } else {
    if (command && command.data.cooldown) {
      cooldownDuration = parseInt(command.data.cooldown, 10);
      voteOnly = command.data.voteonly || false
    }
  }
  if (cooldownDuration > 0) {
    const expirationTime = Date.now() + cooldownDuration * 1000;
    client.cooldowns.set(cooldownKey, expirationTime);
    setTimeout(() => client.cooldowns.delete(cooldownKey), cooldownDuration * 1000);
  }
  if (voteOnly === true) {
    if(!client.topgg) {
      console.log(`Error: The ${commandName} command has voteOnly set to true but the connection to TopGG has not been set`)
      return interaction.reply({
        content: `Something went wrong with topgg. If you are not admin please contact them with \`noconnections set error\``,
        ephemeral: true
      })

    }
    const voted = await client.topgg.hasVoted(interaction.user.id)
    console.log(voted)
    if (!voted) {
      const voteurl = client.topgg.url
      const votebutton = new ButtonBuilder()
        .setEmoji('892253401130340432')
        .setStyle(ButtonStyle.Link)
        .setURL(voteurl)
        .setLabel(`Vote To Unlock`)

      const row = new ActionRowBuilder().addComponents(votebutton);
      if (client.topgg.embed) {
        return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setDescription(`<:error:1230860807252873306> **Vote:** Please vote first before using this command`)
              .setFooter({ text: `Note : Dont worry the vote will help us and its free`, iconURL: 'https://images-ext-1.discordapp.net/external/cpRhajDvGdN-7vpA4v_auFKPbBX9emkfZw0F1i3MLl4/https/cdn.discordapp.com/emojis/1159095895640522822.gif' })
              .setColor('Red')
          ],
          components: [row],
          ephemeral: true,
        })
      } else {
        return interaction.reply({
          content: `<:error:1230860807252873306> **Vote:** Please vote first before using this command`,
          components: [row],
          ephemeral: true,
        })
      }
    }
    if (command) {
      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: `Something went wrong while executing this command...`,
          ephemeral: true,
        }).catch((err) => {
          interaction.editReply({
            content: `Something went wrong while executing this command...`,
            ephemeral: true,
          })
        })
      }
    }
  } else {
    if (command) {
      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: `Something went wrong while executing this command...`,
          ephemeral: true,
        }).catch((err) => {
          interaction.editReply({
            content: `Something went wrong while executing this command...`,
            ephemeral: true,
          })
        })
      }
    }
  }
}
module.exports = handleInteraction;
