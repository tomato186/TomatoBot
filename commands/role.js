const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('node:fs');
const path = require('node:path');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('role')
		.setDescription('get member role')
        .addRoleOption(option => option.setName('role').setDescription('Enter a role').setRequired(true))
        .addUserOption(option => option.setName('member').setDescription('Select a user').setRequired(true)),
		type:"owner",
	async execute(interaction,client,content) {
        
        let cont = interaction.options&& interaction.options.getRole('role') && interaction.options.getRole('role').id || interaction.mentions.roles && interaction.mentions.roles.first() && interaction.mentions.roles.first().id || interaction.guild.roles.cache.find(x=> x.name.toLowerCase().includes(content.split(' ')[1].toLowerCase())) && interaction.guild.roles.cache.find(x=> x.name.toLowerCase().includes(content.split(' ')[1].toLowerCase())).id 
       let role = interaction.guild.roles.cache.get(cont)
       let cont2 = interaction.options&& interaction.options.getUser('member') && interaction.options.getUser('member').id || interaction.mentions.users && interaction.mentions.users.first() && interaction.mentions.users.first().id || interaction.guild.members.cache.get(content.split(' ')[0]) && interaction.guild.members.cache.get(content.split(' ')[0]).id
let member = interaction.guild.members.cache.get(cont2)
let hasit = member.roles.member._roles
if (role && member) {
    let menroles = member.roles.highest.rawPosition
    let botroles = member.guild.members.me.roles.highest.rawPosition
    let memroles = interaction.member.roles.highest.rawPosition
    
    if(menroles > memroles || menroles > botroles || menroles == memroles || botroles == menroles){
      await interaction.react("❌")
      


     


    }else{
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
        
    }
    
        // قم بتحديث الملف JSON مع الوقت الحالي
        
       
} else {
    await interaction.react("❌")
}
  // تحقق مما إذا كان الوقت الحالي بعد الوقت المسموح به
 
	},
};