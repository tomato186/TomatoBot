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
        if (data.owner !== interaction.member.id) {
            const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`اضافه مانجر`)
            .setDescription(`عذرا انت لست بالاونر الاصلي للبوت لذا لا يمكنك استخدام الامر`)
            .setTimestamp();
            
                await interaction.reply({embeds:[exampleEmbed] });
        }else {
let cont = interaction.options&& interaction.options.getUser('manager') && interaction.options.getUser('manager').id ||interaction.options&& interaction.options.getRole('role') && interaction.options.getRole('role').id || interaction.mentions.users && interaction.mentions.users.first() && interaction.mentions.users.first().id || interaction.mentions.roles && interaction.mentions.roles.first() && interaction.mentions.roles.first().id || interaction.guild.members.cache.get(content) &&interaction.guild.members.cache.get(content).id  
var lastUsageTime = data.TimerManager
		var currentTime = new Date().getTime();
    if (cont) {
        if (currentTime - lastUsageTime >= 2* 60 * 1000 || lastUsageTime == 0) {
            // تم تجاوز المدة المسموح بها، قم بتنفيذ الفعل هنا
           
            const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`اضافه مانجير جديد`)
            .setDescription(`تمت اضافه مانجر جديد للبوت بنجاح المانجر الجديد | <@${cont}>`)
            .setTimestamp();
            
                await interaction.reply({embeds:[exampleEmbed] });
            // قم بتحديث وقت الاستخدام الأخير
            data.TimerManager = currentTime;
        data.Managers.push(cont)
            // قم بتحديث الملف JSON مع الوقت الحالي
            
            fs.writeFileSync('config.json', JSON.stringify(data));
          } else {
            let time =Math.floor((lastUsageTime + 2*60 * 1000 ) / 1000)
            // لم يتم السماح باستخدام الفعل حاليًا، يمكنك اتخاذ إجراء آخر هنا
        
            const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`اضافه مانجر `)
            .setDescription(`عذرا تم استخدام الامر مسبقا يرجئ انتظار مده قدرها
            <t:${time}:R>`)
            .setTimestamp();
            
                await interaction.reply({embeds:[exampleEmbed] });
          
          }
    } else {
        
    }    
/*
  // تحقق مما إذا كان الوقت الحالي بعد الوقت المسموح به
 
  */
    }},
};