const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('node:fs');
const path = require('node:path');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('unban user')
        .addStringOption(option => option.setName('id').setDescription('Enter a id').setRequired(true)),
		type:"manager",
	async execute(interaction,client,content) {
let cont = content || interaction.options.getString('id');
console.log(cont)
const jsonData = fs.readFileSync('config.json');
        var data = JSON.parse(jsonData);

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  if(isNumber(cont)){
    
let itbaned = await interaction.guild.bans.fetch({ user:cont, force: true })
if (itbaned) {
    interaction.guild.members.unban(cont).then(async x=>{
        await interaction.react("✅")
    
    }).catch(async x=>{
        console.log(x)
        await interaction.react("❌")
    })
} else {
    await interaction.react("❌")
}
   
 // تحقق مما إذا كان الوقت الحالي بعد الوقت المسموح به
}else if(cont == "all" && data.Owners.includes(interaction.member.id)){
    const bans = await interaction.guild.bans.fetch();
    await interaction.react("✅")
    bans.forEach((ban, index) => {
      setTimeout(async() => {
        await interaction.guild.bans.remove(ban.user);
      }, Math.floor(index * 3000)); // تأخير العنصر بمقدار 1000 ميلي ثانية لكل وحدة في الفهرس
    });
    
}else{
    await interaction.react("❌")
  }
	},
};