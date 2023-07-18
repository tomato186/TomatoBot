const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('node:fs');
const path = require('node:path');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set-prefix')
		.setDescription('set bot prefix')
        .addStringOption(option => option.setName('prefix').setDescription('Enter a prefix').setRequired(true)),
		type:"owner",
	async execute(interaction,client,content) {
let cont = content || interaction.options.getString('prefix');
console.log(cont)
        const jsonData = fs.readFileSync('config.json');
var data = JSON.parse(jsonData);
var lastUsageTime = data.TimerPrefix
		var currentTime = new Date().getTime();
if (cont) {
  if (currentTime - lastUsageTime >= 2* 60 * 1000 || lastUsageTime == 0) {
    // تم تجاوز المدة المسموح بها، قم بتنفيذ الفعل هنا
   
    const exampleEmbed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle(`تغيير البريفيكس`)
    .setDescription(`تم تغيير بريفكس البوت بنجاح الئ ${cont}`)
    .setTimestamp();
    
        await interaction.reply({embeds:[exampleEmbed] });
    // قم بتحديث وقت الاستخدام الأخير
    data.TimerPrefix = currentTime;
data.prefix = cont
    // قم بتحديث الملف JSON مع الوقت الحالي
    
    fs.writeFileSync('config.json', JSON.stringify(data));
  } else {
    let time =Math.floor((lastUsageTime + 2*60 * 1000 ) / 1000)
    // لم يتم السماح باستخدام الفعل حاليًا، يمكنك اتخاذ إجراء آخر هنا

    const exampleEmbed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle(`تغيير البريفيكس`)
    .setDescription(`عذرا تم استخدام الامر مسبقا يرجئ انتظار مده قدرها
    <t:${time}:R>`)
    .setTimestamp();
    
        await interaction.reply({embeds:[exampleEmbed] });
  
  }
} else {
  const exampleEmbed = new MessageEmbed()
  .setColor('#0099ff')
  .setTitle(`تغيير البريفيكس`)
  .setDescription(`عذرا يجب عليك كتابه برفييكس مكون من حرف واحد علئ الاقل`)
  .setTimestamp();
  
      await interaction.reply({embeds:[exampleEmbed] });
}
  // تحقق مما إذا كان الوقت الحالي بعد الوقت المسموح به
 
	},
};