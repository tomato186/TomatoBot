const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('node:fs');
const path = require('node:path');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('live')
		.setDescription('get member role live')
        .addUserOption(option => option.setName('member').setDescription('Select a user').setRequired(true)),
		type:"admin",
	async execute(interaction,client,content) {
        
        let cont2 = interaction.options&& interaction.options.getUser('member') && interaction.options.getUser('member').id || interaction.mentions.users && interaction.mentions.users.first() && interaction.mentions.users.first().id || interaction.guild.members.cache.get(content) && interaction.guild.members.cache.get(content).id
let member = interaction.guild.members.cache.get(cont2)
let hasit = member.roles.member._roles
const jsonData = fs.readFileSync('sets.json');
var data = JSON.parse(jsonData);
let role = interaction.guild.roles.cache.get(data.live)
if (member) {
    let menroles = member.roles.highest.rawPosition
    let botroles = member.guild.members.me.roles.highest.rawPosition
    
    
        if (hasit.includes(role.id)) {
            member.roles.remove(role).then(async x=>{
                
                const exampleEmbed = new MessageEmbed()
                .setColor('#0099ff')
                
                .setDescription(`تم تغيير الرولات لـ ${member.user.username}, -${role.name} :white_check_mark:`)
                .setTimestamp();
                await interaction.reply({embeds:[exampleEmbed]})
            }).catch(async x=>{
                await interaction.react("❌")
          
    
            })
        } else {
            member.roles.add(role).then(async x=>{
                const exampleEmbed = new MessageEmbed()
                .setColor('#0099ff')
                
                .setDescription(`تم تغيير الرولات لـ ${member.user.username}, +${role.name} :white_check_mark:`)
                .setTimestamp();
                await interaction.reply({embeds:[exampleEmbed]})
            }).catch(async x=>{
                await interaction.react("❌")
          
    
            })
        }
        
    
    
        // قم بتحديث الملف JSON مع الوقت الحالي
        
       
} else {
    await interaction.react("❌")
}
  // تحقق مما إذا كان الوقت الحالي بعد الوقت المسموح به
 
	},
};