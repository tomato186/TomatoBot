const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('node:fs');
const path = require('node:path');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setjoin')
		.setDescription('set bot join channel')
        .addChannelOption(option => option.setName('channel').setDescription('Enter a channel').setRequired(true)),
		type:"owner",
	async execute(interaction,client,content) {
        let cont = interaction.options&& interaction.options.getChannel('channel') && interaction.options.getChannel('channel').id || interaction.mentions.channels && interaction.mentions.channels.first() && interaction.mentions.channels.first().id || interaction.guild.channels.cache.get(content) && interaction.guild.channels.cache.get(content).id
       
        const jsonData = fs.readFileSync('logs.json');
var data = JSON.parse(jsonData);

if (cont) {
    data.join = cont;
    await interaction.react("✅")
        // قم بتحديث الملف JSON مع الوقت الحالي
        
        fs.writeFileSync('logs.json', JSON.stringify(data));
} else {
    await interaction.react("❌")
}
  // تحقق مما إذا كان الوقت الحالي بعد الوقت المسموح به
 
	},
};