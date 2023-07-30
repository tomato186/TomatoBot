const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('node:fs');
const path = require('node:path');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set-live')
		.setDescription('set live role')
        .addRoleOption(option => option.setName('role').setDescription('Enter a role').setRequired(true)),
        type:"owner",
	async execute(interaction,client,content) {
        
        let cont = interaction.options&& interaction.options.getRole('role') && interaction.options.getRole('role').id || interaction.mentions.roles && interaction.mentions.roles.first() && interaction.mentions.roles.first().id || interaction.guild.roles.cache.find(x=> x.name.toLowerCase().includes(content.split(' ')[1].toLowerCase())) && interaction.guild.roles.cache.find(x=> x.name.toLowerCase().includes(content.split(' ')[1].toLowerCase())).id 
       let role = interaction.guild.roles.cache.get(cont)
       const jsonData = fs.readFileSync('sets.json');
       var data = JSON.parse(jsonData);
        
if (role) {
    
    data.live = cont;
    await interaction.react("✅")
        // قم بتحديث الملف JSON مع الوقت الحالي
        
        fs.writeFileSync('sets.json', JSON.stringify(data,null,2));
    
        // قم بتحديث الملف JSON مع الوقت الحالي
        
       
} else {
    await interaction.react("❌")
}
  // تحقق مما إذا كان الوقت الحالي بعد الوقت المسموح به
 
	},
};