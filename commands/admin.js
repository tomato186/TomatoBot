const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('node:fs');
const path = require('node:path');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add-admin')
		.setDescription('add new bot admin')
        .addUserOption(option => option.setName('admin').setDescription('Select a user'))
        .addRoleOption(option => option.setName('role').setDescription('Select a role'))
	,
		type:"owner",
	async execute(interaction,client,content) {
        const jsonData = fs.readFileSync('config.json');
        var data = JSON.parse(jsonData);
        
let cont = interaction.options&& interaction.options.getUser('admin') && interaction.options.getUser('admin').id ||interaction.options&& interaction.options.getRole('role') && interaction.options.getRole('role').id || interaction.mentions.users && interaction.mentions.users.first() && interaction.mentions.users.first().id || interaction.mentions.roles && interaction.mentions.roles.first() && interaction.mentions.roles.first().id || interaction.guild.members.cache.get(content) &&interaction.guild.members.cache.get(content).id  
var lastUsageTime = data.TimerManager
		var currentTime = new Date().getTime();
    if (cont) {
         const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`اضافه ادمن جديد`)
            .setDescription(`تمت اضافه ادمن جديد للبوت بنجاح الدمن الجديد | <@${cont}>`)
            .setTimestamp();
            
                await interaction.reply({embeds:[exampleEmbed] });
            // قم بتحديث وقت الاستخدام الأخير
            
        data.Admins.push(cont)
            // قم بتحديث الملف JSON مع الوقت الحالي
            
            fs.writeFileSync('config.json', JSON.stringify(data,null,2));
          
    } else {
        
    }    
/*
  // تحقق مما إذا كان الوقت الحالي بعد الوقت المسموح به
 
  */
    },
};