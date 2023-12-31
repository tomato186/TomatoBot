const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('node:fs');
const path = require('node:path');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add-manager')
		.setDescription('add new bot manager')
        .addUserOption(option => option.setName('manager').setDescription('Select a user'))
        .addRoleOption(option => option.setName('role').setDescription('Select a role'))
	,
		type:"owner",
	async execute(interaction,client,content) {
        const jsonData = fs.readFileSync('config.json');
        var data = JSON.parse(jsonData);
        
let cont = interaction.options&& interaction.options.getUser('manager') && interaction.options.getUser('manager').id ||interaction.options&& interaction.options.getRole('role') && interaction.options.getRole('role').id || interaction.mentions.users && interaction.mentions.users.first() && interaction.mentions.users.first().id || interaction.mentions.roles && interaction.mentions.roles.first() && interaction.mentions.roles.first().id || interaction.guild.members.cache.get(content) &&interaction.guild.members.cache.get(content).id  
var lastUsageTime = data.TimerManager
		var currentTime = new Date().getTime();
    if (cont) {
         const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`اضافه مانجير جديد`)
            .setDescription(`تمت اضافه مانجر جديد للبوت بنجاح المانجر الجديد | <@${cont}>`)
            .setTimestamp();
            
                await interaction.reply({embeds:[exampleEmbed] });
            // قم بتحديث وقت الاستخدام الأخير
            
        data.Managers.push(cont)
            // قم بتحديث الملف JSON مع الوقت الحالي
            
            fs.writeFileSync('config.json', JSON.stringify(data,null,2));
          
    } else {
        
    }    
/*
  // تحقق مما إذا كان الوقت الحالي بعد الوقت المسموح به
 
  */
    },
};