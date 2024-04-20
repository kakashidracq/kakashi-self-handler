const { EmbedBuilder } = require('discord.js');
/**
 * @param {Client} client - Discord Client.
 * @param {Message} message - the messageCreate(message).
 *  @param {string} prefix - The message prefix to run command.
 */


async function handleMessageEvents(client, message, prefix) {
    const { scommands, aliases } = client;
    const cnt = message.content;
    const cmd = cnt.slice(prefix.length).trim().split(/ +/);
    const cd = cmd.shift()
    const args = cnt
    const command = scommands.get(cd) || aliases.get(cd)
    const commandName = command.name
    if (!command) return;
    try {
        if (!cnt.startsWith(prefix)) return;
        if (message.member.permissions.has)
            if (
                !message.member.permissions.has(
                    command.userPerms || ["SendMessages"]
                )
            ) {
                const embed = new EmbedBuilder()
                    .setDescription(`**Alert :** You donot have \`${command.userPerms}\` permission.`)
                    .setColor('Red')
                return message.channel.send({ embeds: [embed] }).catch((err) => {
                    return
                })
            }
        if (!message.guild.members.me.permissions.has(
            command.botPerms || ["SendMessages"]
        )) {
            const embed = new EmbedBuilder()
                .setDescription(`**Alert :** I donot have \`${command.botPerms}\` permissions to use this command `)
                .setColor('Red')
            return message.channel.send({ embeds: [embed] }).catch((err) => {
                return
            })
        }
        console.log(message.author.id)
        const cooldownKey = `${message.author.id}-${commandName}`;
        const userCooldown = client.cooldowns.get(cooldownKey) || 0;
        if (userCooldown > Date.now()) {
            const remainingTime = (userCooldown - Date.now()) / 1000;
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`<:error:1230860807252873306> **Cooldown:** You are on cooldown please wait ${remainingTime.toFixed(1)} seconds`)
                        .setFooter({ text: `Info : The cooldown is for preventing spam usage of commands/buttons`, iconURL: 'https://images-ext-1.discordapp.net/external/cpRhajDvGdN-7vpA4v_auFKPbBX9emkfZw0F1i3MLl4/https/cdn.discordapp.com/emojis/1159095895640522822.gif' })
                        .setColor('Red')
                ]
            });
        }
        const cooldownDuration = command.cooldown || 0;
        if (cooldownDuration > 0) {
            const expirationTime = Date.now() + cooldownDuration * 1000;
            client.cooldowns.set(cooldownKey, expirationTime);
            setTimeout(() => client.cooldowns.delete(cooldownKey), cooldownDuration * 1000);
        }
        command.execute(message, client, args)
    } catch (error) {
        console.error(error);
        await message.reply({
            content: `Something went wrong while executing this command...`,
        });
    }
}

module.exports = handleMessageEvents;
