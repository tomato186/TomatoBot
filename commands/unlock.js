const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('node:fs');
const path = require('node:path');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unlock')
		.setDescription('set channel unlocked')
        .addChannelOption(option => option.setName('channel').setDescription('Enter a channel').setRequired(true)),
		type:"manager",
	async execute(interaction,client,content) {
        let cont = interaction.options&& interaction.options.getChannel('channel') && interaction.options.getChannel('channel').id || interaction.mentions.channels && interaction.mentions.channels.first() && interaction.mentions.channels.first().id || content.length > 18 && interaction.guild.channels.cache.get(content) && interaction.guild.channels.cache.get(content).id || interaction.channelId
       let channel = interaction.guild.channels.cache.get(cont)
if (channel) {

    await interaction.react("✅")
        // قم بتحديث الملف JSON مع الوقت الحالي
        
        channel.permissionOverwrites.edit(interaction.guild.id || interaction.guildId, { SEND_MESSAGES: true });
      
} else {
    await interaction.react("❌")
}
  // تحقق مما إذا كان الوقت الحالي بعد الوقت المسموح به
 
	},
};