const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('node:fs');
const path = require('node:path');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set-username')
		.setDescription('set bot username')
        .addStringOption(option => option.setName('username').setDescription('Enter a username')),
		type:"owner",
	async execute(interaction,client,content) {
let cont = content || interaction.options.getString('username');
console.log(cont)
        const jsonData = fs.readFileSync('config.json');
const data = JSON.parse(jsonData);
var lastUsageTime = data.Timer
		var currentTime = new Date().getTime();

  // تحقق مما إذا كان الوقت الحالي بعد الوقت المسموح به
  if (currentTime - lastUsageTime >= 2*60* 60 * 1000 || lastUsageTime == 0) {
    // تم تجاوز المدة المسموح بها، قم بتنفيذ الفعل هنا
   
    const exampleEmbed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle(`تغيير الاسم`)
    .setDescription(`تم تغيير اسم البوت بنجاح الئ ${cont}`)
    .setTimestamp();
    client.user.setUsername(`${cont}`)
        await interaction.reply({embeds:[exampleEmbed] });
    // قم بتحديث وقت الاستخدام الأخير
    lastUsageTime = currentTime;

    // قم بتحديث الملف JSON مع الوقت الحالي
    const data = {Timer: lastUsageTime };
    fs.writeFileSync('config.json', JSON.stringify(data));
  } else {
    let time =Math.floor((lastUsageTime + 2*60*60 * 1000 ) / 1000)
    // لم يتم السماح باستخدام الفعل حاليًا، يمكنك اتخاذ إجراء آخر هنا

    const exampleEmbed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle(`تغيير الاسم`)
    .setDescription(`عذرا تم استخدام الامر مسبقا يرجئ انتظار مده قدرها
    <t:${time}:R>`)
    .setTimestamp();
    
        await interaction.reply({embeds:[exampleEmbed] });
  
  }
	},
};