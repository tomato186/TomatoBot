const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('node:fs');
const path = require('node:path');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set-avatar')
		.setDescription('set bot avatar')
        .addAttachmentOption(option => option.setName('avatar').setDescription('put the avatar'))
        .addStringOption(option => option.setName('url').setDescription('Enter a url avatar')),
		type:"owner",
	async execute(interaction,client,content) {
let cont = content || interaction.attachments&& interaction.attachments.first().url || interaction.options.getString('url') || interaction.options.getAttachment('avatar').url;
;
console.log(cont)
        const jsonData = fs.readFileSync('config.json');
var data = JSON.parse(jsonData);
var lastUsageTime = data.TimerAvatar
		var currentTime = new Date().getTime();

  // تحقق مما إذا كان الوقت الحالي بعد الوقت المسموح به
  if (currentTime - lastUsageTime >= 2*60* 60 * 1000 || lastUsageTime == 0) {
    // تم تجاوز المدة المسموح بها، قم بتنفيذ الفعل هنا
   
    const exampleEmbed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle(`تغيير الصوره`)
    .setDescription(`تم تغيير صوره البوت بنجاح الئ `)
    .setImage(cont)
    .setTimestamp();
    
        
        client.user.setAvatar(cont).then(async ()=>{
            await interaction.reply({embeds:[exampleEmbed] });
        }).catch(x=>{
    console.log(x)
        })
        
    data.TimerAvatar = currentTime;

    // قم بتحديث الملف JSON مع الوقت الحالي
    
    fs.writeFileSync('config.json', JSON.stringify(data));
  } else {
    let time =Math.floor((lastUsageTime + 2*60*60 * 1000 ) / 1000)
    // لم يتم السماح باستخدام الفعل حاليًا، يمكنك اتخاذ إجراء آخر هنا

    const exampleEmbed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle(`تغيير الصوره`)
    .setDescription(`عذرا تم استخدام الامر مسبقا يرجئ انتظار مده قدرها
    <t:${time}:R>`)
    .setTimestamp();
    
        await interaction.reply({embeds:[exampleEmbed] });
  
  }
	},
};