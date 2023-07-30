const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('node:fs');
const path = require('node:path');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set-username')
		.setDescription('set bot username')
        .addStringOption(option => option.setName('username').setDescription('Enter a username').setRequired(true)),
		type:"owner",
	async execute(interaction,client,content) {
let cont = content || interaction.options.getString('username');
console.log(cont)
        const jsonData = fs.readFileSync('config.json');
var data = JSON.parse(jsonData);
var lastUsageTime = data.TimerUsername

		var currentTime = new Date().getTime();
if (cont && cont.length > 3) {
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
    data.TimerUsername = currentTime;

    // قم بتحديث الملف JSON مع الوقت الحالي
    
    fs.writeFileSync('config.json', JSON.stringify(data,null,2));
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
} else {
  const exampleEmbed = new MessageEmbed()
  .setColor('#0099ff')
  .setTitle(`تغيير الاسم`)
  .setDescription(`عذرا يجب عليك كتابه اسم مكون من 4 حروف علئ لاقل`)
  .setTimestamp();
  
      await interaction.reply({embeds:[exampleEmbed] });
}
  // تحقق مما إذا كان الوقت الحالي بعد الوقت المسموح به
  
	},
};