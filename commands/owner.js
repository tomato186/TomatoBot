const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('node:fs');
const path = require('node:path');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add-owner')
		.setDescription('add new bot owner')
        .addUserOption(option => option.setName('owner').setDescription('Select a user').setRequired(true)),
		type:"owner",
	async execute(interaction,client,content) {
        const jsonData = fs.readFileSync('config.json');
        var data = JSON.parse(jsonData);
        if (data.owner !== interaction.member.id) {
            const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`اضافه اونر`)
            .setDescription(`عذرا انت لست بالاونر الاصلي للبوت لذا لا يمكنك استخدام الامر`)
            .setTimestamp();
            
                await interaction.reply({embeds:[exampleEmbed] });
        }else {
let cont = interaction.options&& interaction.options.getUser('owner') && interaction.options.getUser('owner').id || interaction.mentions.users && interaction.mentions.users.first() && interaction.mentions.users.first().id || interaction.guild.members.cache.get(content) && interaction.guild.members.cache.get(content).id
console.log(cont)
      
var lastUsageTime = data.TimerOwner
		var currentTime = new Date().getTime();
    if (cont) {
        if (currentTime - lastUsageTime >= 2* 60 * 1000 || lastUsageTime == 0) {
            // تم تجاوز المدة المسموح بها، قم بتنفيذ الفعل هنا
           
            const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`اضافه اونر جديد`)
            .setDescription(`تمت اضافه اونر جديد للبوت بنجاح الاونر الجديد | <@${cont}>`)
            .setTimestamp();
            
                await interaction.reply({embeds:[exampleEmbed] });
            // قم بتحديث وقت الاستخدام الأخير
            data.TimerOwner = currentTime;
        data.Owners.push(cont)
            // قم بتحديث الملف JSON مع الوقت الحالي
            
            fs.writeFileSync('config.json', JSON.stringify(data,null,2));
          } else {
            let time =Math.floor((lastUsageTime + 2*60 * 1000 ) / 1000)
            // لم يتم السماح باستخدام الفعل حاليًا، يمكنك اتخاذ إجراء آخر هنا
        
            const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`اضافه اونر `)
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