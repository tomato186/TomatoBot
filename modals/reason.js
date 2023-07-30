const fs = require('node:fs');
const path = require('node:path');
const { MessageActionRow, MessageSelectMenu , MessageEmbed , Modal , TextInputComponent} = require('discord.js');

module.exports = {
	name:'reason',
	async execute(interaction,client) {
        const jsonData = fs.readFileSync('reason.json');
        var data = JSON.parse(jsonData);
		
	
	let cmd = interaction.components[0].components[0].customId.split('-')[1]

let reason = interaction.components[0].components[0].value
let time = interaction.components[1].components[0].value
let length = interaction.components[2].components[0].value

function convertTime(input) {
    const timeAbbreviations = {
      ms: 1,        // ملي ثانية
      s: 1000,      // ثانية
      min: 60000,   // دقيقة
      h: 3600000,   // ساعة
      d: 86400000,  // يوم
      w: 604800000, // أسبوع
      mo: 2592000000, // شهر (30 يومًا)
      y: 31536000000 // سنة (365 يومًا)
    };
  
    const regex = /^(\d+)([a-zA-Z]+)$/; // النمط العادي للتحقق من تنسيق الوقت
  
    let match = regex.exec(input);
    if (match) {
      let value = parseInt(match[1]);
      let unit = match[2];
  
      if (timeAbbreviations.hasOwnProperty(unit)) {
        return value * timeAbbreviations[unit];
      }
    }
  
    // إذا لم يتوافق الحرف المدخل مع أي اختصار وقت معروف، افترضه كوحدة "ساعة"
    return parseInt(input) * timeAbbreviations['h'];
  }
  let convertedTime = convertTime(time);

if (data[cmd].find(x=>x.length == length)) {
    const exampleEmbed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`sorry`)
	.setDescription(`This length it used please use other length`)
	.setTimestamp()
	
			await interaction.reply({embeds:[exampleEmbed] });
	
}else{


    data[cmd].push({
    time:convertedTime,
    reason,
    length
})
data[cmd].sort((a,b)=> a.length - b.length)
const exampleEmbed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`was successfully`)
	.setDescription(`A new reason has been successfully added to the list of reasons for the ${cmd} command`)
	.setTimestamp()
	.addFields(
		{ name: `Reason`, value: `${reason}` },
		{ name: `Time`, value: `${time}` },
        { name: `Length`, value: `${length}` },
		)
			await interaction.reply({embeds:[exampleEmbed] , });
            fs.writeFileSync('reason.json', JSON.stringify(data,null,2));
	
}
},
};